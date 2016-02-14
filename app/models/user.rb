class User < ActiveRecord::Base
  self.inheritance_column = false

  include DestroyedAt
  authenticates_with_sorcery!
  acts_as_voter
  acts_as_followable
  acts_as_follower

  before_validation :remove_whitespaces

  has_many :notifications
  has_many :posts
  has_many :comments
  has_many :feedbacks
  has_one  :basket
  belongs_to :city

  scope :recommended, -> {where(recommended: true)}

  validates :password,
    length:       {message: 'Не менее 5 символов', minimum: 5},
    presence:     {message: 'Не может быть пустым'},
    confirmation: {message: 'Пароли не совпадают'},
    on:           :create
  validates :email, uniqueness: {message: 'Такой email уже занят'}, presence: true
  validates :name, presence: true
  validates :terms_of_service, acceptance: true, on: :create

  mount_uploader :avatar, AvatarUploader

  def get_basket
    if basket
      basket
    else
      create_basket!
    end
  end

  def recommended_users
    User.none
  end

  def self.recommended_for(user)
    if user
      where.not(id: [user.id] + user.all_follows.map(&:followable_id))
        .recommended.order('RANDOM()').limit(3)
    else
      recommended.limit(3)
    end
  end

  def site_url
    if self.school.to_s.starts_with? 'http'
      self.school
    else
      "//" + self.school.to_s
    end
  end

  def city_id= (id)
    self[:city_id] = id.present? ? City.load_external_data(id).id : nil
  end

  private
    def remove_whitespaces
      self.email = email.to_s.squish
      self.type = 'teacher'
    end

end

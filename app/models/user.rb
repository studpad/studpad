class User < ActiveRecord::Base
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

  belongs_to :teacher_category
  belongs_to :teacher_specialization

  validates :password,
    length:       {message: 'Не менее 5 символов', minimum: 5},
    presence:     {message: 'Не может быть пустым'},
    confirmation: {message: 'Пароли не совпадают'},
    on:           :create
  validates :email, uniqueness: { message: 'Такой email уже занят'}, presence: true
  validates :name, presence: true
  validates :terms_of_service, acceptance: true, on: :create

  mount_uploader :avatar, AvatarUploader

  def teacher?
    is_a? Teacher
  end

  def student?
    is_a? Student
  end

  def get_basket
    if basket
      basket
    else
      create_basket!
    end
  end

  def description
    if teacher?
      if self.teacher_category_id == 3
        teacher_specialization.try(:name)
      else
        teacher_category.try(:name)
      end
    else
      'Ученик'
    end
  end

  def recommended_users
    if teacher?
      if self.teacher_category_id == 3
        User.where(teacher_category_id: teacher_category_id)
        .where(teacher_specialization_id: teacher_specialization_id)
      else
        User.where(teacher_category_id: teacher_category_id)
      end
    else
      User.none
    end
  end

  def self.recommended_for(user)
    if user
      where.not(id: [user.id] + user.all_follows.map(&:followable_id)).
        joins(:posts).group('users.id').order('RANDOM()').limit(2)
    else
      all.limit(2)
    end
  end

  private
    def remove_whitespaces
      self.email = email.to_s.squish
    end

end

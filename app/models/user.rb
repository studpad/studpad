class User < ActiveRecord::Base
  include DestroyedAt
  authenticates_with_sorcery!
  acts_as_voter
  acts_as_followable
  acts_as_follower

  before_validation :remove_whitespaces

  has_many :notifications
  has_many :posts

  with_options association_foreign_key: 'group_id', join_table: 'groups_users' do |m|
    m.has_and_belongs_to_many :groups
    m.has_and_belongs_to_many :communities
    m.has_and_belongs_to_many :classrooms
  end
  has_many :own_communities, foreign_key: 'user_id', class_name: 'Community'

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

  def self.recommended_for(user)
    all.limit(2)
  end

  private
    def remove_whitespaces
      self.email = email.to_s.squish
    end

end

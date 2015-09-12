class User < ActiveRecord::Base
  authenticates_with_sorcery!
  before_validation :remove_whitespaces

  has_many :notifications
  has_many :posts

  with_options association_foreign_key: 'group_id', join_table: 'groups_users' do |m|
    m.has_and_belongs_to_many :groups
    m.has_and_belongs_to_many :communities
    m.has_and_belongs_to_many :classrooms
  end

  validates :password,
    length:       {message: 'Не менее 5 символов', minimum: 5},
    presence:     {message: 'Не может быть пустым'},
    confirmation: {message: 'Пароли не совпадают'},
    on:       :create
  validates :password_confirmation, presence: { message: 'Не может быть пустым' }, on: :create
  validates :email, uniqueness: { message: 'Такой email уже занят'}, presence: true
  validates :name, presence: true

  mount_uploader :avatar, AvatarUploader

  def teacher?
    is_a? Teacher
  end

  def student?
    is_a? Student
  end

  private
    def remove_whitespaces
      self.email = email.to_s.squish
    end

end

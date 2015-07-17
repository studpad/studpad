class User < ActiveRecord::Base
  before_validation :remove_whitespaces
  has_many :news_items
  has_many :materials
  #has_many :s
  has_and_belongs_to_many :communities

  authenticates_with_sorcery!

  validates :password, length: { minimum: 5, message: 'Не менее 5 символов' },
    presence: { message: 'Не может быть пустым' }, on: :create
  validates :password, confirmation:  {message: 'Пароли не совпадают' }, on: :create
  validates :password_confirmation, presence: { message: 'Не может быть пустым' }, on: :create
  validates :email, uniqueness: { message: 'Такой email уже занят'}, presence: true
  validates :name, presence: true

  mount_uploader :avatar, AvatarUploader

  def began_with
     Russian::strftime(created_at, '%e %B %Y')
  end

  def avatar_safe_url(size=nil)
    if avatar.url(size)
      avatar.url(size)
    else
      return '/empty.png'
    end
  end

  def teacher?
    false
  end

  def student?
    false
  end

  def can_view?(classroom)
    classroom.main_teacher_id == id || classroom_id == classroom.id
  end

  def main_teacher_of?(classroom)
    teacher? && id == classroom.main_teacher_id
  end

  def teacher_of?(classroom)
    teacher? && classroom.teachers.exists?(id)
  end

  def student_of?(classroom)
    student? && classroom_id == classroom.id
  end

  private
    def remove_whitespaces
      self.email = email.to_s.squish
    end

end

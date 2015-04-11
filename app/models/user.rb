class User < ActiveRecord::Base
  before_validation :remove_whitespaces
  has_many :news_items
  authenticates_with_sorcery!

  validates :password, length: { minimum: 5, message: 'Не менее 5 символов' },
    presence: { message: 'Не может быть пустым' }, on: :create
  validates :password, confirmation:  {message: 'Пароли не совпадают' }, on: :create
  validates :password_confirmation, presence: { message: 'Не может быть пустым' }, on: :create
  validates :email, uniqueness: { message: 'Такой email уже занят'}

  mount_uploader :avatar, AvatarUploader
  crop_uploaded :avatar

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

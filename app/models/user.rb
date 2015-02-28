class User < ActiveRecord::Base
  before_validation :remove_whitespaces

  authenticates_with_sorcery!

  validates :password, length: { minimum: 5, message: 'Не менее 5 символов' },
    presence: { message: 'Не может быть пустым' }
  validates :password, confirmation:  {message: 'Пароли не совпадают' }
  validates :password_confirmation, presence: { message: 'Не может быть пустым' }
  validates :email, uniqueness: { message: 'Такой email уже занят'}

  private
    def remove_whitespaces
      self.email = email.to_s.squish
    end

end

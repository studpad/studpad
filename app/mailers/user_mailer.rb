class UserMailer < ApplicationMailer
  def welcome(user)
    @user = user
    mail(to: 'bsstr@yandex.ru', from: 'noreply@studpad.ru', subject: 'Успешная регистрация')
  end

  def reset_password_email(user)
    @user = User.find user.id
    @url  = edit_password_reset_url(@user.reset_password_token)

    mail(to: @user.email, from: 'noreply@studpad.ru', subject: 'Восстановление пароля')
  end
end

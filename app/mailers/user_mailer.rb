class UserMailer < ApplicationMailer
  def welcome(user)
    @user = user
    mail(to: 'bsstr@yandex.ru', from: 'noreply@studpad.ru', subject: 'Успешная регистрация')
  end
end

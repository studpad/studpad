
Rails.application.config.sorcery.submodules = [:reset_password]

Rails.application.config.sorcery.configure do |config|
  config.user_config do |user|
    user.subclasses_inherit_config = true
    user.reset_password_mailer = UserMailer
    user.reset_password_email_method_name = :reset_password_email
  end

  config.user_class = "User"
end

Airbrake.configure do |config|
  mail_config = YAML.load_file("#{Rails.root}/config/mailer.yml")[Rails.env]
  config.api_key = mail_config['errbit']
  config.host    = 'errbit.studpad.ru'
  config.port    = 80
  config.secure  = config.port == 443
end

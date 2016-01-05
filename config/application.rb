require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Studpad
  class Application < Rails::Application
  #GENERATORS
  config.generators do |g|
    g.test_framework  nil
    g.assets false
    g.helper false
  end
  config.browserify_rails.commandline_options = "-t reactify --extension=\".js.jsx\""
  #LOCALIZATION
  config.i18n.default_locale = :ru
  config.time_zone = 'Europe/Moscow'
  config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.yml')]
  #EMAILING
  mail_config = YAML.load_file("#{Rails.root}/config/mailer.yml")[Rails.env]
  config.action_mailer.delivery_method = :mailgun
  config.action_mailer.mailgun_settings = {
          api_key: mail_config['api_key'],
          domain: mail_config['domain']
  }

  config.active_record.raise_in_transactional_callbacks = true
  end
end

VkontakteApi.configure do |config|
  # параметры, необходимые для авторизации средствами vkontakte_api
  # (не нужны при использовании сторонней авторизации)
  config.app_id       = Rails.application.secrets.vk_auth_key
  config.app_secret   = Rails.application.secrets.vk_auth_token
end

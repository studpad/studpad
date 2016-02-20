Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :vkontakte,
    Rails.application.secrets.vk_auth_key,
    Rails.application.secrets.vk_auth_token,
  {
    :scope => 'email',
    :display => 'popup',
    :lang => 'ru',
    :image_size => 'original'
  }
end

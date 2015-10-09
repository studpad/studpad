ActiveAdmin.setup do |config|
  config.site_title = "Studpad"
  config.site_title_link  = "/"
  config.authentication_method = :authenticate_admin
  config.current_user_method = :current_user
  config.logout_link_path = :logout_path
  # config.on_unauthorized_access = :access_denied

  config.comments_registration_name = 'AdminComment'
  config.batch_actions = true

  # == Localize Date/Time Format
  #
  # Set the localize format to display dates and times.
  # To understand how to localize your app with I18n, read more at
  # https://github.com/svenfuchs/i18n/blob/master/lib%2Fi18n%2Fbackend%2Fbase.rb#L52
  #
  config.localize_format = :long
  config.default_per_page = 30
  # == Menu System
  #
  # You can add a navigation menu to be used in your application, or configure a provided menu
  #
  # To change the default utility navigation to show a link to your website & a logout btn
  #
  #   config.namespace :admin do |admin|
  #     admin.build_menu :utility_navigation do |menu|
  #       menu.add label: "My Great Website", url: "http://www.mygreatwebsite.com", html_options: { target: :blank }
  #       admin.add_logout_button_to_menu menu
  #     end
  #   end
  #
  # If you wanted to add a static menu item to the default menu provided:
  #
  #   config.namespace :admin do |admin|
  #     admin.build_menu :default do |menu|
  #       menu.add label: "My Great Website", url: "http://www.mygreatwebsite.com", html_options: { target: :blank }
  #     end
  #   end
end

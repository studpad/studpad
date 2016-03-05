class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout 'mailer'

  def default_url_options
    if Rails.env.production?
      { :host => "studpad.ru" }
    else
      { :host => "localhost:3000" }
    end
  end
end

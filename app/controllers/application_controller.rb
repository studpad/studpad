class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :require_login

  def default_url_options
    if Rails.env.production?
      { :host => "www.studpad.ru" }
    else
      { :host => "localhost:3000" }
    end
  end

  private
    def not_authenticated
      flash[:warning] = "Пожалуйста, войдите"
      redirect_to welcome_path
    end
end

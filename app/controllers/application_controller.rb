class ApplicationController < ActionController::Base
  include Pundit
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :require_login

  def default_url_options
    if Rails.env.production?
      {host: 'studpad.ru'}
    else
      {host: 'localhost:3000'}
    end
  end

  def find_city_if_need
    @city = City.load_external_data(params[:city_id]) if params[:city_id]
  end

  private
    def authenticate_admin
      redirect_to root_path unless current_user.try(:admin?)
    end

    def not_authenticated
      flash[:warning] = 'Пожалуйста, войдите'
      redirect_to welcome_path
    end
end

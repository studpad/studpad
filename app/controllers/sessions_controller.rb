class SessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]

  def development
  end

  def new
    build_sign_in
  end

  def create
    build_sign_in
    if @sign_in.save and login_from_params
      redirect_back_or_to root_path
    else
      @sign_in.set_error
      render 'new'
    end
  end

  def destroy
    logout
    flash[:success] = "Успешно вышли"
    redirect_to login_path
  end

  private
    def build_sign_in
      @sign_in = User::SignIn.new(sign_in_params)
    end

    def sign_in_params
      sign_in_params = params[:user_sign_in]
      sign_in_params.permit(:email, :password) if sign_in_params
    end

    def login_from_params
      sign_in_params = params[:user_sign_in]
      if sign_in_params
        login(sign_in_params[:email], sign_in_params[:password])
      end
    end

end

class SessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]

  def development
  end

  def new
  end

  def create
    if @user = login(params[:email], params[:password])
      redirect_back_or_to root_path
    else
      flash.now[:warning] = 'Неправильная почта или пароль'
      render 'new'
    end
  end

  def destroy
    logout
    flash[:success] = "Успешно вышли"
    redirect_to login_path
  end
end

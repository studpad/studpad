class PasswordResetsController < ApplicationController
  skip_before_filter :require_login, except: :change

  def change
    @user = User.authenticate(current_user.email, params[:user][:current_password])
    if @user
      @user.generate_reset_password_token!
      @user.password_confirmation = params[:user][:password_confirmation]
      if @user.change_password!(params[:user][:password])
        render text: 'Пароль успешно изменен', status: 200
        return
      end
    end
    render text: 'Вы ввели неправильные данные или пароли не совпадают', status: 422
  end

  def create
    @user = User.find_by_email(params[:user][:email])

    @user.deliver_reset_password_instructions! if @user

    redirect_to(root_path, :notice => 'Дальнейшие инструкции высланы на указанную почту.')
  end

  def edit
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return
    end
  end

  def update
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return
    end

    @user.password_confirmation = params[:user][:password_confirmation]
    if @user.change_password!(params[:user][:password])
      redirect_to(root_path, :notice => 'Password was successfully updated.')
    else
      render :action => "edit"
    end
  end
end

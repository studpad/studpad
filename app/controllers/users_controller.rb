class UsersController < ApplicationController

  skip_before_action :require_login, only: [ :new, :create]

  before_action :find_user, only: [:edit, :show, :update, :destroy]

  def new
    @user = Teacher.new
    @button_name = 'Создать'
  end

  def create
    @user = Teacher.new user_params
    if @user.save
      auto_login @user
      flash[:success] = 'Успешная регистрация'
      redirect_to profile_path
    else
      @button_name = 'Создать'
      render 'new'
    end
  end

  def edit
    @button_name = 'Сохранить'
  end

  def update
    if @user.update_attributes user_params
      flash[:success] = 'Данные успешно изменены'
      redirect_to @user
    else
      @button_name = 'Сохранить'
      render 'edit'
    end
  end

  def show
  end

  def new_ava
    @user = current_user
  end

  def create_ava
    @user = current_user
    if @user.update_attribute :avatar, params[:user][:avatar]
      redirect_to user_path(@user)
    else
      flash[:warning] = 'Недопустимый формат изображения'
      render 'new_ava'
    end
  end

  def profile
    @user = current_user
    render 'show'
  end

  def destroy

  end

  private
    def find_user
      @user = User.find(params[:id])
    end
    def user_params
      params.require(:teacher).permit(:name, :email, :password, :password_confirmation)
    end
end

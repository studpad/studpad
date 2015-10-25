class UsersController < ApplicationController
  skip_before_action :require_login, only: [:new, :create, :show, :posts]

  before_action :find_user, except: [:new, :create, :profile, :edit_profile]

  def new
    @user = User.new
    @button_name = 'Зарегестрироваться'
  end

  def create
    @user = User.new user_params
    if @user.save
      auto_login @user
      @user.recommended_users.each do |u|
        @user.follow(u)
        u.follow(@user)
      end
      flash[:success] = 'Успешная регистрация'
      #UserMailer.welcome(@user).deliver_later

      redirect_to root_path
    else
      @button_name = 'Создать'
      render 'new'
    end
  end

  def edit
  end

  def edit_profile
    @user = current_user
    render 'edit'
  end

  def update
    if @user.update_attributes user_params
      flash[:success] = 'Данные успешно изменены'
      redirect_to user_path
    else
      @button_name = 'Сохранить'
      render 'edit'
    end

  end

  def posts
    #Post.where(user_id: [@user.id] + @user.all_follows.map(&:followable_id))
    @posts = @user.posts.order(created_at: :desc).limit(params[:count])
    render 'posts/index', formats: :json
  end

  def show
  end

  def follow
    current_user.follow(@user)
    redirect_to :back
  end

  def unfollow
    current_user.stop_following(@user)
    redirect_to :back
  end

  def create_ava
    a = Attachment.create(file: params[:avatar])
    render json: { url: a.file.url, attachment_id: a.id  }
  end

  def crop
    a = Attachment.find(params[:attachment_id])
    @user.update_attribute :avatar, a.file.file
    a.destroy
    @user.avatar.crop(params[:crop_x], params[:crop_y], params[:crop_w],
     params[:crop_h], params[:height], params[:width])
    @user.save! #нахождение этой строчки именно здесь важно
    @user.avatar.recreate_versions!

    redirect_to user_path
  end

  def profile
    @user = current_user
    render 'show'
  end

  def destroy
    #@user.remove_avatar!
    @user.destroy
    redirect_to root_path
  end

  private
    def find_user
      @user = User.find(params[:id])
    end

    def ava_params
      params.require(:user).permit(:fieldname_crop_x, :fieldname_crop_y,
      :fieldname_crop_w, :fieldname_crop_h, :avatar)
    end

    def user_params
      name = :user
      name = :teacher if params[:teacher]
      name = :student if params[:student]

      params.require(name).permit(:name, :email, :type,
        :teacher_category_id, :teacher_specialization_id,
        :school, :password, :password_confirmation, :terms_of_service)
    end
end

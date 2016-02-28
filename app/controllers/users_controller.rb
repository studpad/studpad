class UsersController < ApplicationController
  skip_before_action :require_login,
    only: [:new, :create, :show, :basket_posts, :posts]

  before_action :find_user,
    except: [:new, :create, :profile, :edit_profile]

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      auto_login @user
      # @user.recommended_users.each do |u|
      #   @user.follow(u)
      #   u.follow(@user)
      # end
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
      render 'edit'
    end
  end

  def posts
    @posts = @user.posts.order(created_at: :desc).limit(params[:count])
    render 'posts/index', formats: :json
  end

  def show
  end

  def basket_posts
    @posts = @user.get_basket.posts.order(created_at: :desc).limit(params[:count])
    render 'posts/index', formats: :json
  end

  def follow
    current_user.follow(@user)
    Notification.follow.find_or_create_by!(user: @user, who: current_user)
    redirect_to :back
  end

  def unfollow
    current_user.stop_following(@user)
    Notification.follow.where(
      user: @user,
      who: current_user).destroy_all
    redirect_to :back
  end

  def follow_several
    #byebug
    User.where(id: params[:user_ids]).limit(5).each do |u|
      @user.follow(u)
    end
    render nothing: true
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

  def favourite
    respond_to do |f|
      f.json do
        @posts = @user.get_voted(Post).order(created_at: :desc).limit(params[:count])
        render 'posts/index'
      end
      f.html {}
    end
  end


  private
    def find_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email,
        :instagram_id, :vk_id, :description, :city_id,
        :school, :password, :password_confirmation, :terms_of_service)
    end
end

class SessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]

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
    redirect_to root_path
  end

  def create_external
    result = request.env['omniauth.auth']
    name = result['info']['name']
    email = result['info']['email']
    avatar_url = result['info']['image']

    u = User.find_or_create_by!(email: email) do |user|

      tmp_file = Tempfile.new(['avatar', '.jpg'])
      tmp_file.binmode
      open(avatar_url) do |url_file|
        tmp_file.write(url_file.read)
      end
      tmp_file.close
      user.avatar = tmp_file

      vk = VkontakteApi::Client.new
      user.instagram_id = vk.users.get(uid: result.uid, fields: [:connections]).first['instagram']

      user.vk_id = "id#{result.uid}"
      user.name = name

      tmp_password = SecureRandom.hex 4
      user.password = tmp_password
      user.password_confirmation = tmp_password
    end
    auto_login(u)
    redirect_to root_path
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

class CommunitiesController < ApplicationController
  before_action :find_community, except: [:create, :index, :create_ava]

  def posts
    @posts = @community.posts
    render 'posts/index'
  end

  def index
    @communities = Community.all.includes(:founder)
  end

  def create
    @community = current_user.communities.create community_params
    redirect_to @community
  end

  def show
    @posts = @community.posts
  end

  def edit
  end

  def update
    if @community.update_attributes community_params
      redirect_to @community
    else
      render 'edit'
    end
  end

  def unjoin
    @community.unjoin(current_user)
    redirect_to @community
  end

  def join
    @community.join(current_user)
    redirect_to @community
  end

  def create_ava
    a = Attachment.create(file: params[:avatar])
    render json: { url: a.file.url, attachment_id: a.id  }
  end

  def crop
    a = Attachment.find(params[:attachment_id])
    @community.update_attribute :avatar, a.file.file
    a.destroy
    @community.avatar.crop(params[:crop_x], params[:crop_y], params[:crop_w],
     params[:crop_h], params[:height], params[:width])
    @community.save! #нахождение этой строчки именно здесь важно
    @community.avatar.recreate_versions!

    redirect_to community_path
  end

  private
    def find_community
      @community = Community.find params[:id]
      @notices = @community.notifications.last(3)
    end

    def community_params
      params.require(:community).permit(:name, :status, :description)
    end
end

class PostsController < ApplicationController
  before_action :find_post, except: [:create, :index]
  skip_before_filter :require_login, :index

  def create
    @post = current_user.posts.create post_params
    @post.bind_tags(params[:post][:tags])
    @post.attachment_ids = params[:post][:attachment_ids]
    params[:post][:text_elements].each do |position, element|
      case element['type']
      when 'text'
        @post.text_elements.create text_type: 'text',
          text: element[:text],
          position: position
      when 'image'
        @post.text_elements.create text_type: 'image',
          image: Attachment.find(element['data']['id']).file,
          position: position
      when 'divider'
        @post.text_elements.create text_type: 'divider',
          position: position
      else
        raise 'Undefined text type'
      end
    end

    render nothing: true
  end

  def change_categories
    @post.category_ids = params[:category_ids]
    puts @post.update_attributes recommended: params[:recommended],
      visible: params[:visible]
    render nothing: true
  end

  def show
    respond_to do |format|
      format.html { }
      format.json {
        @posts = [@post]
        render 'posts/index'
      }
    end
  end

  def destroy
    @post.destroy
    render nothing: true
  end

  def like
    voted = current_user.voted_for? @post
    if voted
      @post.unliked_by current_user
      Notification.like.where(
        who: current_user,
        user: @post.user,
        post: @post).destroy_all
    else
      @post.liked_by current_user
      Notification.like.create!(
        who: current_user,
        user: @post.user,
        post: @post)
    end
    render nothing: true
  end

  def basket
    current_user.get_basket.toggle_add(@post)
    render nothing: true
  end

  def update
    @post.update_attributes post_params
    @post.bind_tags(params[:post][:tags])
    @post.attachment_ids = params[:post][:attachment_ids]
    element_ids = params[:post][:text_elements].values.map{|e| e[:id]}.compact
    @post.text_element_ids = element_ids
    params[:post][:text_elements].each do |position, element|
      case element['type']
      when 'text'
        if element[:id]
          @post.text_elements.find(element[:id]).update_attributes text_type: 'text',
            text: element[:text],
            position: position
        else
          @post.text_elements.create text_type: 'text',
            text: element[:text],
            position: position
        end
      when 'image'
        if element[:id]
          @post.text_elements.find(element[:id]).update_attributes position: position
        else
          @post.text_elements.create text_type: 'image',
            image: Attachment.find(element['data']['id']).file,
            position: position
        end
      when 'divider'
        if element[:id]
          @post.text_elements.find(element[:id]).update_attributes position: position
        else
          @post.text_elements.create text_type: 'divider', position: position
        end
      else
        raise 'Undefined text type'
      end
    end

    render nothing: true
  end

  def index
    @posts = Post.for_user(current_user).limit(params[:count])
    render :index, formats: :json
  end

  private
    def post_params
      params.require(:post).permit(
        :title, :post_type, :group_id, :city_id,
        :youtube_id, :attachment_ids,
        photo_ids: [],
        linkdata: [:title, :domain, :description, :url, :image_url])
    end

    def find_post
      authorize @post = Post.find(params[:id])
    end
end

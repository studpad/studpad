class PostsController < ApplicationController
  before_action :find_post, except: [:create, :index]

  def create
    @post = current_user.posts.create post_params
    @post.attachment_ids = params[:post][:attachment_ids]
    params[:post][:text_elements].each do |position, element|
      case element['type']
      when 'text'
        @post.text_elements.create text_type: 'text',
          text: element['value'],
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
    @posts = Post.all.order(created_at: :desc)
    render :index, formats: :json
  end

  def destroy
    @post.destroy
    render nothing: true
  end

  def update
    @post.update_attributes post_params
    render nothing: true
  end

  def index
    @posts = Post.all.order(created_at: :desc)
    render :index, formats: :json
  end

  private
    def post_params
      params.require(:post).permit(
        :title, :post_type, :group_id, :attachment_ids,
        linkdata: [:title, :domain, :description, :url])
    end

    def find_post
      authorize @post = Post.find(params[:id])
    end
end

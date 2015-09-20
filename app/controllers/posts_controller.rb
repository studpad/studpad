class PostsController < ApplicationController
  before_action :find_post, except: [:create, :index]

  def create
    @post = current_user.posts.create post_params
    @post.attachment_ids = params[:post][:attachment_ids]
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
        :text, :title, :post_type, :group_id, :attachment_ids,
        linkdata: [:title, :domain, :description, :url])
    end

    def find_post
      authorize @post = Post.find(params[:id])
    end
end

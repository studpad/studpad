class TagsController < ApplicationController
  skip_before_action :require_login
  def index
    data = Tag.where('name ILIKE ?', "%#{params[:term]}%").limit(10)
      .select(:id, :name).map(&:attributes)
    render json: data
  end

  def show
    @tag = Tag.find(params[:id])
    @posts = Post.joins(:tags).where(posts_tags:{tag: @tag}).limit(params[:count])
    render 'posts/index', formats: :json
  end
end

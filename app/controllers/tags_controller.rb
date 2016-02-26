class TagsController < ApplicationController
  skip_before_action :require_login
  before_action :find_city_if_need

  def index
    data = Tag.where('name ILIKE ?', "#{params[:term]}%").limit(10)
      .select(:id, :name).map(&:attributes)
    render json: data
  end

  def show
    @tag = Tag.find(params[:id])
    @posts = Post.joins(:tags).where(posts_tags:{tag: @tag}).order(created_at: :desc).limit(params[:count])
    @posts = @posts.where(city_id: params[:city_id]) if params[:city_id]
    render 'posts/index', formats: :json
  end
end

class CategoriesController < ApplicationController
  skip_before_filter :require_login
  before_action :find_city_if_need
  def show
    @posts = Category.find(params[:id]).posts.order(created_at: :desc).limit(params[:count])
    @posts = @posts.where(city_id: params[:city_id]) if params[:city_id]
    render 'posts/index', formats: :json
  end
end

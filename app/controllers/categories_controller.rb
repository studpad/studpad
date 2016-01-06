class CategoriesController < ApplicationController
  def show
    @posts = Category.find(params[:id]).posts.order(created_at: :desc).limit(params[:count])
    render 'posts/index', formats: :json
  end
end

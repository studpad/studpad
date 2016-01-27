class CategoriesController < ApplicationController
  skip_before_filter :require_login

  def show
    @posts = Category.find(params[:id]).posts.order(created_at: :desc).limit(params[:count])
    render 'posts/index', formats: :json
  end
end

class CategoriesController < ApplicationController
  def show
    @posts = Post.where(category_id: params[:id]).limit(params[:count])
    render 'posts/index', formats: :json
  end
end

class FeedController < ApplicationController
  skip_before_filter :require_login

  def show
  end

  def explore
    if params[:category_name]
      @category = Category.find_by_name(params[:category_name])
      @tag_name = params[:category_name]
      @posts_path = @category ? category_path(@category) : posts_path
    else
      @tag = Tag.find_by_name(params[:tag_name])
      @tag_name = params[:tag_name] ? ('#' + params[:tag_name]) : 'Популярное'
      @posts_path = @tag ? tag_path(@tag) : posts_path
    end
  end
end

class FeedController < ApplicationController
  skip_before_filter :require_login

  def show
  end

  def explore
    @tag = Tag.find_by_name(params[:tag_name])
    @tag_name = params[:tag_name] ? ('#' + params[:tag_name]) : '#популярное'
    @posts_path = @tag ? tag_path(@tag) : posts_path
  end
end

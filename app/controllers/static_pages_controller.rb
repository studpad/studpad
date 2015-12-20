class StaticPagesController < ApplicationController
  skip_before_action :require_login, only: [ :main, :terms, :licence, :privacy]
  def main
    if current_user
      @materials = Post.all.order(created_at: :desc)
      @how_does_it_work = true
      render 'feed/show'
    else
      render 'main'
    end
  end
end

class StaticPagesController < ApplicationController
  skip_before_action :require_login, only: [ :main, :terms, :licence, :privacy]
  def main
    if current_user
      @materials = Post.all.order(created_at: :desc)
      render 'feed/show'
    else
      render 'main'
    end
  end

  def example
  end
end

class StaticPagesController < ApplicationController
  skip_before_action :require_login, only: [ :main ]
  def main
    if current_user
      @materials = Material.all.order(created_at: :desc)
      render 'feed/show'
    else
      render 'main'
    end
  end
end

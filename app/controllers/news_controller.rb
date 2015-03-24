class NewsController < ApplicationController
  def create
    NewsItem.create text: params[:textHW], classroom_id: params[:id], user_id: current_user.id
    redirect_to classroom_path
  end
end

class NewsController < ApplicationController
  def create
    NewsItem.create text: params[:textHW], classroom_id: params[:id], user_id: current_user.id
    redirect_to classroom_path
  end

  def destroy
    news = NewsItem.find(params[:id])
    if current_user.id == news.user_id
      news.destroy
    end
    redirect_to classroom_path(news.classroom_id)
  end
end

class NewsController < ApplicationController
  def create
    @news = NewsItem.create news_params do |n|
      n.user_id = current_user.id
      n.classroom_id = params[:classroom_id]
    end
    render 'show', layout: false
  end

  def destroy
    news = NewsItem.find(params[:id])
    if current_user.id == news.user_id
      news.destroy
    end
    redirect_to classroom_path(news.classroom_id)
  end

  def comment
    NewsItem.find(params[:id]).comments.create body: params[:text], user_id: current_user.id
    redirect_to classroom_path(params[:classroom_id])
  end

  def update
    n = NewsItem.find(params[:id])
    n.update_attribute :text, params[:text]
    redirect_to classroom_path(n.classroom_id)
  end

  def multicreate

  end

  private
    def news_params
      params.require(:news_item).permit(:text)
    end

end

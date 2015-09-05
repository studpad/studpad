class Communities::NewsController < ApplicationController
  def create
    @community = Community.find(params[:community_id])
    @news = NewsItem.create news_params do |n|
      n.user_id = current_user.id
      n.source = @community
    end

    @newsItems = @community.news.order(created_at: :desc)
    render 'news/index', formats: :json
  end

  def index
    @community = Community.find(params[:community_id])
    @newsItems = @community.news.order(created_at: :desc)
    render 'news/index', formats: :json
  end

  private
    def news_params
      params.require(:news_item).permit(:text)
    end
end

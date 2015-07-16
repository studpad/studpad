class CommunitiesController < ApplicationController
  #layout :community

  def edit
  end

  def create
    @community = Community.create community_params
    redirect_to @community
  end

  def show
    @community = Community.find params[:id]
    @news = @community.news
    @news_action = community_news_index_path(params[:id])
  end

  private
    def community_params
      params.require(:community).permit(:name, :type)
    end
end

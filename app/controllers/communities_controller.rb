class CommunitiesController < ApplicationController
  before_action :find_community, except: [:create, :index]

  def edit
  end

  def index
    @communities = Community.all.includes(:founder)
  end

  def update
    if @community.update_attributes community_params
      redirect_to @community
    else
      render 'edit'
    end
  end

  def join
    unless @community.member? current_user
      @community.users << current_user
    end
  end

  def create
    @community = Community.new community_params
    @community.founder = current_user
    @community.save!

    redirect_to @community
  end

  def show
    @news = @community.news
    @news_action = community_news_index_path(params[:id])
  end

  private
    def find_community
      @community = Community.find params[:id]
    end

    def community_params
      params.require(:community).permit(:name, :status)
    end
end

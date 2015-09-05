class NewsController < ApplicationController
  before_action :find_news_item, except: [:create, :index]

  def create
    @news_item = NewsItem.create news_params.merge({user_id: current_user.id})

    @newsItems = NewsItem.all.order(created_at: :desc)
    render 'index', formats: :json
  end

  def destroy
    @news_item.destroy
    render nothing: true
  end

  def update
    @news_item.update_attributes news_params
    render nothing: true
  end

  def index
    @newsItems = NewsItem.all.order(created_at: :desc)
    render 'index', formats: :json
  end

  private
    def news_params
      params.require(:news_item).permit(:text).
        merge({ user_id: current_user.id })
    end

    def find_news_item
      @news_item = NewsItem.find(params[:id])
      authorize @news_item
    end
end

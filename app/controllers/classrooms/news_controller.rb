class Classrooms::NewsController < ApplicationController
  def index
    @classroom = Classroom.find params[:classroom_id]
    @newsItems = @classroom.news.order(created_at: :desc)
    render 'news/index', formats: :json
  end

  def create
    @classroom = Classroom.find params[:classroom_id]
    @news = NewsItem.create news_params do |n|
      n.user_id = current_user.id
      n.source = @classroom
    end

    @newsItems = @classroom.news.order(created_at: :desc)
    render 'news/index', formats: :json
  end

  private
    def news_params
      params.require(:news_item).permit(:text)
    end
end

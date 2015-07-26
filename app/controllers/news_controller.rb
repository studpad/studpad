class NewsController < ApplicationController
  def create
    @news = NewsItem.create news_params do |n|
      n.user_id = current_user.id
      #n.source = Classroom.find(params[:classroom_id])
    end

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")

    Attachment.find(@files).each do |f|
      f.attachable = @news
      f.save!
    end

    # @news.attachments(true)
    # render 'show', layout: false
    @newsItems = NewsItem.all.order(created_at: :desc)
    render 'index', formats: :json
  end

  def destroy
    news = NewsItem.find(params[:id])
    if current_user.id == news.user_id
      news.destroy
    end
    #redirect_to news.source #classroom_path(news.classroom_id)
    render nothing: true
  end

  def comment
    news = NewsItem.find(params[:id])
    news.comments.create text: params[:text], user_id: current_user.id
    redirect_to news.source
  end

  def update
    n = NewsItem.find(params[:id])
    n.update_attribute :text, params[:text]
    redirect_to n.source #classroom_path(n.classroom_id)
  end

  def index
    @newsItems = NewsItem.all.order(created_at: :desc)
    render 'index', formats: :json
  end

  private
    def news_params
      params.require(:news_item).permit(:text)
    end

end

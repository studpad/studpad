class Communities::NewsController < ApplicationController
  def create
    @news = NewsItem.create news_params do |n|
      n.user_id = current_user.id
      n.source = Community.find(params[:community_id])
    end

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")

    Attachment.find(@files).each do |f|
      f.attachable = @news
      f.save!
    end

    @news.attachments(true)
    render 'news/show', layout: false
  end

  private
    def news_params
      params.require(:news_item).permit(:text)
    end
end

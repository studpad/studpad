class CommentsController < ApplicationController
  def update
    c = Comment.find(params[:id])
    c.update_attribute :text, params[:text]
    redirect_to c.commentable.source
  end

  def destroy
    c = Comment.find(params[:id])
    c.destroy
    redirect_to c.commentable.source
  end


end

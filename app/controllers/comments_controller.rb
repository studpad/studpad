class CommentsController < ApplicationController
  def update
    c = Comment.find(params[:id])
    c.update_attribute :body, params[:text]
    redirect_to classroom_path c.commentable.classroom.id
  end

  def destroy
    c = Comment.find(params[:id])
    c.destroy
    redirect_to classroom_path c.commentable.classroom.id
  end
end

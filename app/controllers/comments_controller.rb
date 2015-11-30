class CommentsController < ApplicationController
  before_action :find_comment, except: :create
  before_action :build_comment, only: :create

  def create
    comment = current_user.comments.create!(comment_params)
    post = @comment.commentable
    Notification.comment.create!(
      who: current_user,
      user: post.user,
      post: post )
    render nothing: true
  end

  def update
    @comment.update_attributes comment_params
    render nothing: true
  end

  def destroy
    post = @comment.commentable
    Notification.comment.where(
      who: current_user,
      user: post.user,
      post: post).destroy_all
    @comment.destroy
    render nothing: true
  end

  private
    def comment_params
      params.require(:comment).permit(:text, :commentable_id, :commentable_type)
    end

    def find_comment
      @comment = Comment.find(params[:id])
      authorize @comment
    end

    def build_comment
      @comment = Comment.new comment_params
      @comment.user = current_user
      authorize @comment
    end
end

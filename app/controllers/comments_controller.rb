class CommentsController < ApplicationController
  before_action :find_comment, except: :create
  before_action :build_comment, only: :create

  def create
    @comment.save!
  end

  def update
    @comment.update_attribute :text, params[:text]
    redirect_to c.commentable.source
  end

  def destroy
    @comment.destroy
    redirect_to @comment.commentable.source
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

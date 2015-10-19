class CommentsController < ApplicationController
  before_action :find_comment, except: :create
  before_action :build_comment, only: :create

  def create
    current_user.comments.create!(comment_params)
    render nothing: true
  end

  def update
    @comment.update_attributes comment_params
    render nothing: true
  end

  def destroy
    logger.debug @comment.destroy
  end

  private
    # def render
    #   @comments = @comment.commentable.comments.includes(:user)
    #   super 'index'
    # end

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

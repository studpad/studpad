class FeedbacksController < ApplicationController
  def create
    current_user.feedbacks.create! feedback_params
    redirect_to :back
  end

  private
    def feedback_params
      params.require(:feedback).permit(:message)
    end
end

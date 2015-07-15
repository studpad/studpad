class CommunitiesController < ApplicationController
  def create
    @community = Community.create community_params
    redirect_to @community
  end

  def show
    @community = Community.find params[:id]
  end

  private
    def community_params
      params.require(:community).permit(:name, :type)
    end
end

class Communities::NoticesController < ApplicationController
  def index
    @community = Community.find params[:community_id]
    @notices = @community.notifications
  end

  def new

  end

end

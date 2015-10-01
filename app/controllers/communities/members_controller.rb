class Communities::MembersController < ApplicationController
  def index
    @community = Community.find params[:community_id]
    @members = User.all
    @notices = @community.notifications
  end
end

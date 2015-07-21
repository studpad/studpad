class Communities::NoticesController < ApplicationController
  before_action :find_notification, only: [:destroy, :update]

  def index
    @community = Community.find params[:community_id]
    @notices = @community.notifications
  end

  def new

  end

  def destroy
    @notification.destroy
    render nothing: true
  end

  def update
    @community = @notification.notable
    if @notification.mode == 'request'
      @notification.update_attribute :mode, 'join'
      unless @community.member? @notification.user
        @community.users << @notification.user
      end
    end
    redirect_to community_notices_path(@community)
  end

  private
    def find_notification
      @notification = Notification.find(params[:id])
    end

end

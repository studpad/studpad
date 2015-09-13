class Group < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :users
  has_many :posts

  def community?
    is_a? Community
  end

  def classroom?
    is_a? Classroom
  end

  def join(user)
    # if @community.secret?
    #   @community.notifications.create user_id: current_user.id, mode: 'request'
    # else
    #   unless @community.member? current_user
    #     @community.notifications.create user_id: current_user.id, mode: 'join'
    #     @community.users << current_user
    #   end
    # end
    raise 'unimplemented feauture'
  end

  def unjoin(user)
    #@group.notifications.where(user_id: current_user.id).destroy_all
    raise 'unimplemented feauture'
  end
end

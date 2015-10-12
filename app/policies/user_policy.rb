class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def edit?
    current_user.id == user.id
  end

  def follow?
    true
  end

  def unfollow?
    true
  end
end

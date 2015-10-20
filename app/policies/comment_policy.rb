class CommentPolicy < Struct.new(:user, :comment)
  def update?
    is_owner? || is_admin?
  end

  def create?
    true
  end

  def destroy?
    is_owner? || is_admin?
  end

  def like?
    true
  end

  private
    def is_owner?
      user.try(:id) == comment.user_id
    end

    def is_admin?
      user.try(:admin?)
    end
end

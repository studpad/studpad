class PostPolicy < Struct.new(:user, :post)
  def update?
    is_owner?
  end

  def create?
    true
  end

  def destroy?
    is_owner?
  end

  private
    def is_owner?
      user.try(:id) == post.user_id
    end
end

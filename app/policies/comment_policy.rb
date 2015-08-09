class CommentPolicy < < Struct.new(:user, :comment)
  def update?
    true
  end

  def create?
    true
  end

  def destroy?
    true
  end
end

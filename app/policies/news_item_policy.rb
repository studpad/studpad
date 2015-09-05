class NewsItemPolicy < Struct.new(:user, :news_item)
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
      user.id == news_item.user_id
    end
end

class Group < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :users
  has_many :posts, as: :source

  def community?
    is_a? Community
  end

  def classroom?
    is_a? Classroom
  end

  def join(user)
    raise 'unimplemented feauture'
  end

  def unjoin(user)
    raise 'unimplemented feauture'
  end
end

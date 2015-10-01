class Group < ActiveRecord::Base
  belongs_to :founder, foreign_key: 'user_id', class_name: 'User'
  has_and_belongs_to_many :users
  has_many :posts

  def community?
    is_a? Community
  end

  def classroom?
    is_a? Classroom
  end

  def join(user)
    users << user
  end

  def unjoin(user)
    users.delete(user)
  end
end

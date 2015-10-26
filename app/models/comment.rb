class Comment < ActiveRecord::Base
  default_scope { order(id: :asc) }
  belongs_to :commentable, polymorphic: true
  belongs_to :user
end

class Comment < ActiveRecord::Base
  default_scope { order(id: :asc) }
  belongs_to :commentable, polymorphic: true, inverse_of: :comments
  belongs_to :user
end

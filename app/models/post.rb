class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :group
  has_many :comments, as: :commentable
  enum post_type: ['filegroup', 'link', 'text', 'quotation']
end

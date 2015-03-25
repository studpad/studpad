class NewsItem < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :user
  has_many :comments, as: :commentable
end

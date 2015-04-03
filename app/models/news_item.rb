class NewsItem < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :user
  has_and_belongs_to_many :subject
  has_many :comments, as: :commentable, dependent: :destroy
end

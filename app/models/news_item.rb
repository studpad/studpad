class NewsItem < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :user
  has_many :attachments, as: :attachable, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy
end

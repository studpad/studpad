class NewsItem < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :user
end

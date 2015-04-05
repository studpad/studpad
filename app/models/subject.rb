class Subject < ActiveRecord::Base
  has_and_belongs_to_many :news_items
  has_many :homeworks
end

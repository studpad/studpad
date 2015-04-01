class Album < ActiveRecord::Base
  belongs_to :classroom
  has_many :photos
end

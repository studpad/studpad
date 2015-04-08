class Album < ActiveRecord::Base
  belongs_to :classroom
  has_many :photos

  def last_photo
    self.photos.limit(1).order(created_at: 'desc').first
  end
end

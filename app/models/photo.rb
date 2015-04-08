class Photo < ActiveRecord::Base
  belongs_to :user
  belongs_to :album
  mount_uploader :image, PhotoUploader
end

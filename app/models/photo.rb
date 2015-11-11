class Photo < ActiveRecord::Base
  mount_uploader :image, ImageUploader

  def url
    link || image.to_s
  end
end

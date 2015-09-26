class TextElement < ActiveRecord::Base
  belongs_to :post
  mount_uploader :image, ImageUploader
  enum text_type: ['text', 'image', 'divider']
end

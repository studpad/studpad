class Material < ActiveRecord::Base
  belongs_to :user
  belongs_to :classroom

  mount_uploader :file, FileUploader
end

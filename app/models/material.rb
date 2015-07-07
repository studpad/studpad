class Material < ActiveRecord::Base
  belongs_to :user
  belongs_to :classroom
  has_many :attachments, as: :attachable, dependent: :destroy

  mount_uploader :file, FileUploader

end

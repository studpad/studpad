class Attachment < ActiveRecord::Base
  belongs_to :attachable, polymorphic: true

  mount_uploader :file, FileUploader

  def type
    extension = file.file.extension
    if ['jpg', 'gif', 'png'].include?(extension)
      return "image"
    elsif ['mov', 'mp4'].include?(extension)
      return "video"
    else
      return "other"
    end
  end
end

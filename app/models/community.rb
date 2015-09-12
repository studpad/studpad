class Community < Group
  has_many :notifications, as: :notable

  enum status: { open: 0, secret: 1 }
  mount_uploader :avatar, AvatarUploader
end

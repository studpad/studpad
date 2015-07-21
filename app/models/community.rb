class Community < ActiveRecord::Base
  has_many :news, as: :source, class_name: "NewsItem", dependent: :destroy
  has_and_belongs_to_many :users

  has_many :community_shares
  has_many :materials, through: :community_shares
  has_many :notifications, as: :notable

  belongs_to :founder, class_name: 'User'
  enum status: { open: 0, secret: 1 }

  mount_uploader :avatar, AvatarUploader

  def avatar_safe_url(size=nil)
    if avatar.url(size)
      avatar.url(size)
    else
      return '/empty.png'
    end
  end

  def member? (user)
    users.exists? user
  end
end

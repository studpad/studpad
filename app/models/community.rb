class Community < ActiveRecord::Base
  has_many :news, as: :source, class_name: "NewsItem", dependent: :destroy
  has_and_belongs_to_many :users

  has_many :community_shares
  has_many :materials, through: :community_shares

  belongs_to :founder, class_name: 'User'
  enum status: { open: 0, secret: 1 }
end

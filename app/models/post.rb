class Post < ActiveRecord::Base
  acts_as_votable
  belongs_to :user
  belongs_to :group
  has_many :comments, as: :commentable
  has_many :attachments, as: :attachable, dependent: :destroy
  has_many :text_elements, -> { order(:position) }, dependent: :destroy
  enum post_type: ['filegroup', 'link', 'text', 'quotation']
  serialize :linkdata

  default_scope { includes(:user, :attachments, :text_elements, :comments) }

  def self.listed(group, user=nil)
    if group
      group.posts.order(created_at: :desc)
    else
      user.posts.order(created_at: :desc)
    end
  end

  def user
    User.unscoped { super }
  end

  def self.for_user(user)
    if user
      where(user_id: [user.id] + user.all_follows.map(&:followable_id)).order(created_at: :desc)
    else
      all.order(created_at: :desc)
    end
  end
end

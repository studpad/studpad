class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :group
  has_many :comments, as: :commentable
  has_many :attachments, as: :attachable, dependent: :destroy
  has_many :text_elements, -> { order(:position) }, dependent: :destroy
  enum post_type: ['filegroup', 'link', 'text', 'quotation']
  serialize :linkdata
end

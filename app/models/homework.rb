class Homework < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :user
  belongs_to :subject
  has_many :attachments, as: :attachable, dependent: :destroy

end

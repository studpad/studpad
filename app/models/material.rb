class Material < ActiveRecord::Base
  belongs_to :user
  belongs_to :classroom
  belongs_to :subject

  has_many :classroom_shares
  has_many :classrooms, through: :classroom_shares

  has_many :community_shares
  has_many :communities, through: :community_shares

  has_many :attachments, as: :attachable, dependent: :destroy

  def times_shared
    (classrooms_count - 1 == 0) ? '' : (classrooms_count - 1)
  end

  def main_image
    attachments.find{|a| a.main? }
  end

  def files_ids
    result = attachments.ids
    mi = main_image
    result.delete(mi.id) if mi
    result.join " "
  end

  def images
    attachments.find_all{|a| !a.main? && a.image? }
  end

  def files
    attachments.find_all{|a| !a.image? }
  end

end

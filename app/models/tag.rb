class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  before_validation :format_name
  has_and_belongs_to_many :posts

  def format_name
    self.name = name.to_s.mb_chars.downcase.to_s.strip.gsub(/\s+/, " ")
  end
end

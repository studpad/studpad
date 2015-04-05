class Homework < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :teacher
  belongs_to :subject
end

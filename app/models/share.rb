class Share < ActiveRecord::Base
  self.table_name = :classrooms_materials
  belongs_to :classroom
  belongs_to :material, counter_cache: :classrooms_count
end

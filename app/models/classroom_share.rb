class ClassroomShare < ActiveRecord::Base
  self.table_name = :classrooms_materials

  #validates_uniqueness_of :sharing, scope: [:material_id, :classroom_id]

  belongs_to :classroom
  belongs_to :material, counter_cache: :classrooms_count
end

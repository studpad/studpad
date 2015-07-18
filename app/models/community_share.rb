class CommunityShare < ActiveRecord::Base
  self.table_name = :communities_materials

  #validates_uniqueness_of :sharing, scope: [:material_id, :community_id]

  belongs_to :community
  belongs_to :material, counter_cache: :communities_count
end

class CommunityShare < ActiveRecord::Base
  self.table_name = :communities_materials
  belongs_to :community
  belongs_to :material, counter_cache: :communities_count
end

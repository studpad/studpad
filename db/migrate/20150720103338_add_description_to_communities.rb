class AddDescriptionToCommunities < ActiveRecord::Migration
  def change
    add_column :communities, :description, :string
    add_column :communities, :avatar, :string
  end
end

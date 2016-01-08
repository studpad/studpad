class AddSocialNetworksInfo < ActiveRecord::Migration
  def change
    add_column :users, :vk_id, :string
    add_column :users, :instagram_id, :string
  end
end

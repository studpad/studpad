class AddDestroyedAtToUsers < ActiveRecord::Migration
  def change
    add_column :users, :destroyed_at, :datetime
    add_index :users, :destroyed_at, where: "destroyed_at IS NOT NULL"
  end
end

class RemoveOldTables < ActiveRecord::Migration
  def change
    remove_foreign_key "communities_users", "communities"
    remove_foreign_key "communities_users", "users"
    drop_table :classrooms
    drop_table :classrooms_materials
    drop_table :classrooms_teachers
    drop_table :communities
    drop_table :communities_materials
    drop_table :communities_users
    drop_table :groups
    drop_table :groups_users
    drop_table :homeworks
    drop_table :materials
    drop_table :news_items
  end
end

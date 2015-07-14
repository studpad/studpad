class RemoveUnnecessary < ActiveRecord::Migration
  def change
    drop_table :albums
    remove_column :classrooms, :school_id
    rename_column :comments, :body, :text
    remove_column :materials, :name
    drop_table :news_items_subjects
    drop_table :photos
    drop_table :schools
  end
end

class CreateTeacherCategories < ActiveRecord::Migration
  def change
    create_table :teacher_categories do |t|
      t.string :name

      t.timestamps null: false
    end
    add_column :users, :teacher_category_id, :integer, index: true
    add_column :users, :teacher_specialization_id, :integer, index: true
  end
end

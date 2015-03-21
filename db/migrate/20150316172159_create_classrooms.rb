class CreateClassrooms < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.belongs_to :classroom, index: true
      t.string :type
    end

    create_table :classrooms do |t|
      t.string :name, null: false
      t.belongs_to :school, index: true
      t.belongs_to :main_teacher, index: true

      t.timestamps null: false
    end
  end
end

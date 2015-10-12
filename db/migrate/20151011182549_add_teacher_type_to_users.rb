class AddTeacherTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :teacher_type, :integer, default: 0
  end
end

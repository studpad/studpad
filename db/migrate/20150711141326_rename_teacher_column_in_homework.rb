class RenameTeacherColumnInHomework < ActiveRecord::Migration
  def change
    rename_column(:homeworks, :teacher_id, :user_id)
  end
end

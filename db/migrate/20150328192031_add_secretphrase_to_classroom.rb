class AddSecretphraseToClassroom < ActiveRecord::Migration
  def change
    add_column :classrooms, :secretphrase, :string
  end
end

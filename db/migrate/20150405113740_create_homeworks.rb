class CreateHomeworks < ActiveRecord::Migration
  def change
    create_table :homeworks do |t|
      t.string :name
      t.text :description

      t.belongs_to :classroom, index: true
      t.belongs_to :teacher, index: true
      t.belongs_to :subject, index: true

      t.timestamps null: false
    end
  end
end

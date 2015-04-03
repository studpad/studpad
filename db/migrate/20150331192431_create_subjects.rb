class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.string :name, null: false

      t.timestamps null: false
    end

    create_table :news_items_subjects do |t|
      t.belongs_to :news_item, index: true
      t.belongs_to :subject, index: true
    end
  end
end

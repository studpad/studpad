class CreateNewsItems < ActiveRecord::Migration
  def change
    create_table :news_items do |t|
      t.belongs_to :grade
      t.text :text

      t.timestamps null: false
    end
  end
end

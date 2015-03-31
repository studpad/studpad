class CreateThemes < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :name, null: false

      t.timestamps null: false
    end

    create_table :news_items_themes do |t|
      t.belongs_to :news_items, index: true
      t.belongs_to :themes, index: true
    end
  end
end

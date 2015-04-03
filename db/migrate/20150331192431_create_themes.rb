class CreateThemes < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :name, null: false

      t.timestamps null: false
    end

    create_table :news_items_themes do |t|
      t.belongs_to :news_item, index: true
      t.belongs_to :theme, index: true
    end
  end
end

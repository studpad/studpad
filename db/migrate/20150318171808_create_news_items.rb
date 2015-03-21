class CreateNewsItems < ActiveRecord::Migration
  def change
    create_table :news_items do |t|
      t.belongs_to :classroom
      t.text :text

      t.timestamps null: false
    end
  end
end

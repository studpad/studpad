class CreateNewsItems < ActiveRecord::Migration
  def change
    create_table :news_items do |t|
      t.belongs_to :classroom, index: true
      t.belongs_to :user, index: true
      t.text :text

      t.timestamps null: false
    end
  end
end

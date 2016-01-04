class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.timestamps null: false
    end
    create_table :posts_tags do |t|
      t.belongs_to :tag, index: true
      t.belongs_to :post, index: true
      t.timestamps null: false
    end
  end
end

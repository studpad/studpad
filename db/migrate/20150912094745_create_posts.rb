class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :text
      t.string :title
      t.integer :post_type, null: false
      t.belongs_to :user, index: true
      t.belongs_to :group, index: true

      t.timestamps null: false
    end
  end
end

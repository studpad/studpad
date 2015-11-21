class CreateBaskets < ActiveRecord::Migration
  def change
    create_table :baskets do |t|
      t.text :post_ids, array: true, default: []
      t.belongs_to :user, index: true

      t.timestamps null: false
    end

    add_column :posts, :user_add_ids, :text, array: true, default: []
  end
end

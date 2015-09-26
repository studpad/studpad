class CreateTextElements < ActiveRecord::Migration
  def change
    create_table :text_elements do |t|
      t.string :text
      t.integer :text_type, default: 0
      t.integer :position, null: false
      t.string :image
      t.belongs_to :post, index: true, null: false

      t.timestamps null: false
    end
  end
end

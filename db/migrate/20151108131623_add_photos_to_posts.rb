class AddPhotosToPosts < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :link
      t.string :image
      t.belongs_to :user, index: true
      t.belongs_to :post, indes: true

      t.timestamps null: false
    end
  end
end

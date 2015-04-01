class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :name
      t.string :link
      t.belongs_to :user, index: true
      t.belongs_to :album, index: true

      t.timestamps null: false
    end
  end
end

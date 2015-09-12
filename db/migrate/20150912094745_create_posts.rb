class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :text
      t.belongs_to :user, index: true
      t.belongs_to :source, index: true, polymorphic: true

      t.timestamps null: false
    end
  end
end

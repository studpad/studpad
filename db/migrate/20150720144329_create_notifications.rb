class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.integer :mode
      t.string :text
      t.boolean :public, default: true
      t.belongs_to :user, index: true
      t.belongs_to :notable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end

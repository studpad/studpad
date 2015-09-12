class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.string :description
      t.string :avatar
      t.string :type
      t.integer :status, default: 0

      t.belongs_to :user, index: true

      t.timestamps null: false
    end

    create_table :groups_users do |t|
      t.belongs_to :user, index: true
      t.belongs_to :group, index: true
    end
  end
end

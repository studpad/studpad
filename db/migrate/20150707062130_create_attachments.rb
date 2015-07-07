class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :file
      t.belongs_to :user, index: true
      t.belongs_to :attachable, polymorphic: true, index: true
      t.timestamps null: false
    end
  end
end

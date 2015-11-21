class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.text :message
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end

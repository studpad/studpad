class ChangeNotifications < ActiveRecord::Migration
  def change
    remove_column :notifications, :notable_id
    remove_column :notifications, :notable_type
    add_column :notifications, :post_id, :integer, index: true
  end
end

class AddWhoIdToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :who_id, :integer, index: true
  end

  def data
    Notification.destroy_all
  end
end

class AddViewedToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :viewed, :boolean, default: false
  end
end

class AddRecomendedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :recommended, :boolean, default: false
  end
end

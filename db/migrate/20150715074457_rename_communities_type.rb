class RenameCommunitiesType < ActiveRecord::Migration
  def change
    rename_column :communities, :type, :status
  end
end

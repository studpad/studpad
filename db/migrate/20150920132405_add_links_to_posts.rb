class AddLinksToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :linkdata, :string, hash: true, default: {}
  end
end

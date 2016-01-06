class AddVotesCache < ActiveRecord::Migration
  def change
    add_column :posts, :cached_votes_total, :integer, default: 0
    add_column :posts, :recommended, :boolean, default: false
    add_index  :posts, :cached_votes_total
  end

  def data
    Post.find_each(&:update_cached_votes)
  end
end

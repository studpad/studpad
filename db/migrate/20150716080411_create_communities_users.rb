class CreateCommunitiesUsers < ActiveRecord::Migration
  def change
    create_table :communities_users do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :community, index: true, foreign_key: true
    end

    change_table :communities do |t|
      t.belongs_to :founder, index: true
    end
  end
end

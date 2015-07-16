class AddPolymorphicToNews < ActiveRecord::Migration
  def change
    change_table :news_items do |t|
      t.belongs_to :source, polymorphic: true, index: true
      t.remove :classroom_id
    end
  end
end

class ReformatTags < ActiveRecord::Migration
  def data
    Tag.find_each do |t|
      t.valid?
      t.save
    end
  end
end

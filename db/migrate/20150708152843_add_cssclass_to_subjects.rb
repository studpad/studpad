class AddCssclassToSubjects < ActiveRecord::Migration
  def change
    add_column :subjects, :cssclass, :string
  end
end

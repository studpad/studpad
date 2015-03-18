class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.string :name, null: false
      t.string :ogrn_ident
      t.string :kpp_ident

      t.timestamps null: false
    end
  end
end

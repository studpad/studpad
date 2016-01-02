class RemoveCategories < ActiveRecord::Migration
  def change
    drop_table :teacher_categories
    drop_table :teacher_specializations
  end

  def data
    Post.where(post_type: [
      Post.post_types['filegroup'],
      Post.post_types['quotation'],
      Post.post_types['text']
    ]).destroy_all
  end
end

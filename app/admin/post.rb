ActiveAdmin.register Post do
  includes :user
  actions :index, :show, :destroy, :edit, :update
  menu label: 'Публикации'

  filter :id
  filter :post_type
  filter :user

  sidebar 'Напоминание' do
    'Создавать и редактировать посты можно только из пользовательского интерфейса.'
  end

  permit_params :recommended, category_ids: []

  form do |f|
    f.input :categories
    f.input :recommended
    f.submit
  end

  index do
    id_column
    column :post_type
    column :user
    column :created_at
    actions
  end
end

ActiveAdmin.register Post do
  includes :user
  actions :index, :show, :destroy
  menu label: 'Публикации'
  filter :id
  filter :post_type
  filter :user
  sidebar 'Напоминание' do
    'Создавать и редактировать посты можно только из пользовательского интерфейса.'
  end
  index do

    id_column
    column :post_type
    column :user
    column :created_at
    #column :admin
    actions
  end
end

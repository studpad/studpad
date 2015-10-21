ActiveAdmin.register User do
  permit_params :name, :admin
  menu label: 'Пользователи'
  filter :id
  filter :name
  filter :email
  filter :teacher_category
  filter :teacher_specialization
  filter :admin, as: :check_boxes

  index do
    id_column
    column :name
    column :email
    column :created_at
    column :admin
    actions
  end

  show do
    attributes_table do
      row (:avatar) { |u| image_tag(u.avatar.thumb.to_s) }
      row :id
      row :name
      row :email
      row :created_at
      row :updated_at
      row :school
      row :admin
    end
    active_admin_comments
  end

  form do |f|
    f.inputs 'Редактирование пользователя' do
      #f.input :email, as: :email
      f.input :name
      f.input :admin
    end
    f.actions
  end
end

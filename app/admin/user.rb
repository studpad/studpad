ActiveAdmin.register User do
  permit_params :name, :admin, :recommended
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
    column :recommended
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
      row :recommended
      row :admin
    end
    active_admin_comments
  end

  form do |f|
    f.inputs 'Редактирование пользователя' do
      f.input :name
      f.input :admin
      f.input :recommended, label: "Показывать как рекомендованного"
    end
    f.actions
  end
end

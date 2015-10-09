ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Пользователи" do
          h1 User.count
        end
      end

      column do
        panel "Посты" do
          h1 Post.count
        end
      end

      column do
        panel "Attachments" do
          h1 Attachment.count
        end
      end
    end
  end # content
end

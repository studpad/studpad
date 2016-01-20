ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Статистика" do
          yandex_link = <<-LINK
            <!-- Yandex.Metrika informer -->
              <a href="https://metrika.yandex.ru/stat/?id=32955634&amp;from=informer"
              target="_blank" rel="nofollow"><img src="https://informer.yandex.ru/informer/32955634/3_0_007FFFFF_007FFFFF_1_pageviews"
              style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" onclick="try{Ya.Metrika.informer({i:this,id:32955634,lang:'ru'});return false}catch(e){}" /></a>
            <!-- /Yandex.Metrika informer -->
          LINK
          yandex_link.html_safe
        end
      end

      column do
        panel "Пользователи" do
          h1 "#{User.count}/#{User.unscoped.count}"
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
          a 'Очистить', href: clean_attachments_path
        end
      end
    end

  end # content

end

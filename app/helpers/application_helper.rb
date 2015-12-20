module ApplicationHelper
  def button_name(record)
    record.new_record? ? 'Создать' : 'Сохранить'
  end

  def times_tag(n)
    n = n.to_i
    raw "<span class='badge pull-right'>#{n}</span>" if n > 0
  end
end

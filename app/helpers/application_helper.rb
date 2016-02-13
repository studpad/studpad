module ApplicationHelper
  def button_name(record)
    record.new_record? ? 'Создать' : 'Сохранить'
  end

  def times_tag(n)
    n = n.to_i
    raw "<span class='badge pull-right'>#{n}</span>" if n > 0
  end

  def category_name_path(name)
    "/explore?category_name=#{name}"
  end

  def tag_name_path(name)
    "/explore?tag_name=#{name}"
  end

  def city_params(city_id)
    if city_id
      "?city_id=#{city_id}"
    else
      ""
    end
  end


end

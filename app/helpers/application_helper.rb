module ApplicationHelper
  def button_name(record)
    record.new_record? ? 'Создать' : 'Сохранить'
  end

  def load_subjects
    if current_user.can_view?(@classroom)
      @subjects = Subject.all
    end
  end

  def times_tag(n)
    n = n.to_i
    raw "<span class='badge pull-right'>#{n}</span>" if n > 0
  end

  def classroom_id
    params[:classroom_id] || params[:id]
  end

  def community_id
    params[:community_id] || params[:id]
  end
end

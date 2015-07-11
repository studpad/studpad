module ApplicationHelper
  def button_name(record)
    record.new_record? ? 'Создать' : 'Сохранить'
  end

  def load_subjects
    if current_user.can_view?(@classroom)
      @subjects = Subject.all
    end
  end

  def classroom_id
    params[:classroom_id] || params[:id]
  end
end

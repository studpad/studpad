module ApplicationHelper
  def load_subjects
    if current_user.can_view?(@classroom)
      @subjects = Subject.all
    end
  end
end

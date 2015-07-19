class Classrooms::ClassmatesController < ApplicationController
  skip_before_action :require_login

  def index
    @classroom = Classroom.find(params[:classroom_id])
    @classmates = @classroom.students
  end
end

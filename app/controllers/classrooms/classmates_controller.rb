class Classrooms::ClassmatesController < ApplicationController
  def index
    @classroom = Classroom.find(params[:classroom_id])
    @classmates = @classroom.students
  end
end

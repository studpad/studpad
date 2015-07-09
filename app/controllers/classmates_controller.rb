class ClassmatesController < ApplicationController
  def index
    @classmates = Classroom.find(params[:classroom_id]).students
  end
end

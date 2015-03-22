class ClassroomsController < ApplicationController
  def index
    @classrooms = Classroom.all
  end

  def new
    @classroom = Classroom.new
    @all_teachers = Teacher.all
    @all_schools = School.all
  end

  def create
    @classroom = Classroom.new classroom_params

    if @classroom.save
      flash[:success] = 'Комната успешно создана'
      redirect_to @classroom
    else
      @all_teachers = Teacher.all
      @all_schools = School.all
      render 'new'
    end
  end

  def show
    @classroom = Classroom.find(params[:id])
  end

  private
    def classroom_params
      params.require(:classroom).permit(:name, :school_id, :main_teacher_id)
    end

end

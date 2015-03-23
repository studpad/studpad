class ClassroomsController < ApplicationController
  def index
    @classrooms = Classroom.all
  end

  def new
    unless current_user.teacher?
      flash[:warning] = 'Только учитель может создавать класс'
      redirect_to root_path
    end
    @classroom = Classroom.new
    @all_schools = School.all
  end

  def create
    unless current_user.teacher?
      flash[:warning] = 'Только учитель может создавать класс'
      redirect_to root_path
    end
    @classroom = Classroom.new classroom_params
    @classroom.main_teacher_id = current_user.id

    if @classroom.save
      flash[:success] = 'Комната успешно создана'
      redirect_to @classroom
    else
      @all_schools = School.all
      render 'new'
    end
  end

  def show
    @classroom = Classroom.find(params[:id])
  end

  def add
    @students = Student.all
  end

  def adding
    s = Student.find(add_student_id)
    s.update_attribute :classroom_id, params[:id]
    redirect_to classroom_path
  end

  private
    def classroom_params
      params.require(:classroom).permit(:name, :school_id)
    end

    def add_student_id
      params[:classroom][:student_id]
    end
end

class ClassroomsController < ApplicationController
  skip_before_filter :require_login, only:[:show, :new_student, :create_student]
  before_action :find_classroom, except: [:create, :index, :new, :new_student]
  before_action :load_subjects

  def index
    @classrooms = Classroom.all
  end

  def edit
  end

  def update
    if @classroom.update_attributes classroom_params
      redirect_to @classroom
    else
      render 'edit'
    end

  end

  def join
    @classroom.students << current_user
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
    # unless current_user.teacher?
    #   flash[:warning] = 'Только учитель может создавать класс'
    #   redirect_to root_path
    # end
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
    @news_action = classroom_news_index_path(@classroom)
    @news = @classroom.news.order(created_at: :desc)
  end

  def new_student
    @student = Student.new
  end

  def create_student
    @student = Student.new new_student_params
    @student.classroom = @classroom

    if @classroom.secretphrase.to_s == params[:secretphrase] && @student.save
      flash[:success] = 'Ученик успешно создан'
      auto_login @student
      redirect_to user_path(@student)
    else
      render 'new_student'
    end
  end

  private
    def classroom_params
      params.require(:classroom).permit(:name)
    end

    def new_student_params
      params.require(:student).permit(:name, :email, :password, :password_confirmation)
    end

    def find_classroom
      id = params[:classroom_id] || params[:id]
      @classroom = Classroom.find id
    end

    def load_subjects
      @subjects = Subject.all
    end
end

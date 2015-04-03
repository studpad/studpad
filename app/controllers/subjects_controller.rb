class SubjectsController < ApplicationController
  def show
    @subjects = Subject.all
    @classroom = Classroom.find(params[:classroom_id])
    @news = Subject.find(params[:id]).news_items.where(classroom_id: params[:classroom_id])
    render 'classrooms/show'
  end
end

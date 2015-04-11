class MaterialsController < ApplicationController
  def index
  	 @classroom = Classroom.find(params[:classroom_id])
  end

  def new
  end

  def edit
  end

  def show
  end
end

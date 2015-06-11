class MaterialsController < ApplicationController
  def index
  	 @classroom = Classroom.find(params[:classroom_id])
  end

  def new
    @material = Material.new
  end

  def create
    @material = Material.create(material_params)
    render 'edit'
  end

  def edit
  end

  def show
  end

  private
    def material_params
      params.require(:material).permit(:name, :description, file).deep_merge({classroom_id: params[:classroom_id]})
    end
end

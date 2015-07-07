class MaterialsController < ApplicationController
  def index
  	 @classroom = Classroom.find(params[:classroom_id])
  end

  def new
    @material = Material.new
  end

  def create
    @mp = material_params
    @material = Material.create(material_params)
    @material.save!
    render nil
  end

  def edit
  end

  def show
  end

  private
    def material_params
      params.require(:material).permit(:name, :description, :file)
    end
end

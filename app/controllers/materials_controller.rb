class MaterialsController < ApplicationController
  def index
  	@classroom = Classroom.find(params[:classroom_id])

  end

  def new
    @material = Material.new
  end

  def create
    @material = Material.new
    @material.description = params[:description]
    @material.save!

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")
    Attachment.find(@files).each do |f|
      f.attachable = @material
      f.save!
    end

    render json: @material
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

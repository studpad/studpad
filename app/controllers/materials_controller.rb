class MaterialsController < ApplicationController
  def index
  	@classroom = Classroom.find(params[:classroom_id])
    @materials = Material.all
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

    unless params[:main_image].blank?
      @main = Attachment.find(Integer(params[:main_image]))
      @main.attachable = @material
      @main.main = true
      @main.save!
    end

    render @material, layout: false
  end

  def edit
    @material = Material.first
    render @material, layout: false
  end

  def show
  end

  private
    def material_params
      params.require(:material).permit(:name, :description, :file)
    end
end

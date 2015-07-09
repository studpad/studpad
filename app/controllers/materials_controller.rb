class MaterialsController < ApplicationController
  def index
  	@classroom = Classroom.find(params[:classroom_id])
    @materials = Material.all.order(created_at: :desc)
  end

  def new
    @material = Material.new
  end

  def create
    @material = Material.new
    @material.description = params[:description]
    @material.user = current_user
    @material.subject_id = params[:tag]
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
  end

  def update
    @material = Material.find(params[:id])
    @material.description = params[:description]
    @material.subject_id = params[:tag]
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

  def show
    @material = Material.find(params[:id])
    render "show.json", formats: :json, layout: false
  end

  private
    def material_params
      params.require(:material).permit(:name, :description, :file)
    end
end

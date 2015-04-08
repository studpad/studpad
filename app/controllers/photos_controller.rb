class PhotosController < ApplicationController

	def index
    @classroom = Classroom.find(params[:classroom_id])

  end

  def show

  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new photo_params
    @photo.save
  end

  private
    def photo_params
      params.require(:photo).permit(:name, :image, :classroom_id)
    end

end

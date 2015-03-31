class PhotosController < ApplicationController

	def index
    @classroom = Classroom.find(params[:classroom_id])
    @photos = @classroom.photos
  end

  def show

  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new photo_params
  end

  private
    def photo_params
      params.require(:photo).permit(:name, :link, :classroom_id)
    end

end

class PhotosController < ApplicationController

	def index
    @classroom = Classroom.find(params[:classroom_id])
    @photos = @classroom.photos
  end

  def show

  end

end

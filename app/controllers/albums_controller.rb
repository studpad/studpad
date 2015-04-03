class AlbumsController < ApplicationController
  def index
    @classroom = Classroom.find(params[:classroom_id])
  end

  def show
    @classroom = Classroom.find(params[:classroom_id])
    @album = Album.find(params[:id])
  end
end

class AlbumsController < ApplicationController
  def index
    @classroom = Classroom.find(params[:classroom_id])
    @albums = @classroom.albums
  end

  def show
    @classroom = Classroom.find(params[:classroom_id])
    @album = Album.find(params[:id])
    @photos = @album.photos
  end
end

class AlbumsController < ApplicationController
  def index
    @subjects = Subject.all
    @classroom = Classroom.find(params[:classroom_id])
    @albums = @classroom.albums
  end

  def show
    @subjects = Subject.all
    @classroom = Classroom.find(params[:classroom_id])
    @album = Album.find(params[:id])
    @photos = @album.photos
  end
end

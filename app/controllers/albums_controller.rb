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

  def new
    @album = Album.new #Classroom.find(params[:classroom_id]).create
  end

  def create
    @album = Album.create name: params[:album][:name], classroom_id: params[:classroom_id]
    if @album
      redirect_to classroom_albums_path
    else
      render 'new'
    end
  end

  def newphoto
    @photo = Photo.new
    render 'photos/new'
  end

  def create_newphoto
    @photo = Photo.new photo_params
    @photo.album_id = params[:id]
    @photo.user_id = current_user.id
    @photo.save
    redirect_to classroom_album_path(params[:classroom_id], params[:id])
  end

  private
    def photo_params
      params.require(:photo).permit(:name, :image)
    end
end

class PhotosController < ApplicationController
  def create
    @photo = Photo.new(image: params[:file], link: params[:link])
    if @photo.save
      render json: {id: @photo.id, url: @photo.url}
    else
      render json: {error: 'save photo error'}
    end
  end
  # def destroy
  #   @attachment = Attachment.find(params[:id])
  #   @attachment.destroy if @attachment
  #   render nothing: true
  # end
end

class PhotosController < ApplicationController

	def index
    @photos = Photos.all
  end

  def show

  end

end

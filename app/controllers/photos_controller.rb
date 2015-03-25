class PhotosController < ApplicationController

	def index
    @photos = Photos.all
  end

end

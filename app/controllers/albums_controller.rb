class AlbumsController < ApplicationController
  def index
    @classroom = Classroom.find(params[:classroom_id])
  end
end

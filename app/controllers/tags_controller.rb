class TagsController < ApplicationController
  def index
    data = Tag.where('name ILIKE ?', "%#{params[:term]}%")
      .pluck(:name).map(){|e| {id: e, text: e}}
    pp data
    render json: data
  end
end

class TagsController < ApplicationController
  def index
    render json: Tag.pluck(:name)
  end
end

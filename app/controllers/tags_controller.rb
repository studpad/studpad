class TagsController < ApplicationController
  def index
    data = Tag.where('name ILIKE ?', "%#{params[:term]}%").limit(10)
      .select(:id, :name).map(&:attributes)
    render json: data
  end
  def show
    @tag = Tag.find(params[:id])
  end
end

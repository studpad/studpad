class LineController < ApplicationController
  def show
  	@materials = Material.all.order(created_at: :desc)
  end
end

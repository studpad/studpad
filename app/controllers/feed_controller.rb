class FeedController < ApplicationController
  skip_before_filter :require_login

  def show
  	@materials = Material.all.order(created_at: :desc)
  end
end

class SchoolsController < ApplicationController

  def new
    @school = School.new
  end

  def create

  end

  private
    def school_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

end

class AttachmentsController < ApplicationController
  def create
    @attachment = Attachment.new(file: params[:file])
    if @attachment.save
      #render json: @attachment
      render json: {error: 'BIG ERROR'}
    else
      render json: {error: 'BIG ERROR'}
    end
  end

  def destroy
    @attachment = Attachment.find(params[:id])
    @attachment.destroy if @attachment

  end
end

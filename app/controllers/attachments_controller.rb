class AttachmentsController < ApplicationController
  def create
    @a = Attachment.new(file: params[:file])
    #@a = Attachment.first
    if @a.save
      render 'create.json', layout: false
    else
      render json: {error: 'BIG ERROR'}
    end
  end

  def destroy
    @attachment = Attachment.find(params[:id])
    @attachment.destroy if @attachment
    render nothing: true
  end

end

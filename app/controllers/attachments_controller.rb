class AttachmentsController < ApplicationController
  def create
    logger.debug params
    @a = Attachment.new(file: params[:file])
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

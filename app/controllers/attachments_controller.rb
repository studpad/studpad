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

  def clean
    Attachment.where(created_at: 2.month.ago..1.day.ago)
              .where(attachable_id: nil).destroy_all
    redirect_to :back
  end
end

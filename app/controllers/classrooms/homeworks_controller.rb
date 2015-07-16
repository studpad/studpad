class Classrooms::HomeworksController < ApplicationController
  def index
    @homeworks = Homework.all.order(created_at: :desc)
  end

  def show
    @homework = Homework.find(params[:id])
  end

  def create
    @homework = Homework.new
    @homework.description = params[:description]
    @homework.user = current_user
    @homework.subject_id = params[:tag]
    @homework.save!

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")
    Attachment.find(@files).each do |f|
      f.attachable = @homework
      f.save!
    end

    render @homework, layout: false
  end

  def update
    @homework = Homework.find(params[:id])
    @homework.description = params[:description]
    @homework.subject_id = params[:tag]
    @homework.save!

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")

    @homework.attachments.where.not(id: @files).destroy_all
    Attachment.find(@files).each do |f|
      f.attachable = @homework
      f.save!
    end


    @homework.attachments(true)
    render @homework, layout: false
  end

  def destroy
    @homework.find(params[:id]).destroy
  end

end

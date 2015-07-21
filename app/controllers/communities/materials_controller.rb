class Communities::MaterialsController < ApplicationController

  def index
    @community = Community.find params[:community_id]
    @materials = @community.materials.order(created_at: :desc)
    @notices = @community.notifications
  end

  def create
    @material = Material.new do |m|
      m.description = params[:description]
      m.user = current_user
      m.subject_id = params[:tag]
    end
    @material.save!

    @material.communities << Community.find(params[:community_id])

    @files = params[:attached_files]
    @files = @files.to_s.squish.split(" ")

    Attachment.find(@files).each do |f|
      f.attachable = @material
      f.save!
    end

    unless params[:main_image].blank?
      @main = Attachment.find(Integer(params[:main_image]))
      @main.attachable = @material
      @main.main = true
      @main.save!
    end
    @material.communities_count = 1  #какой-то баг при создании
    render object: @material, partial: '/materials/material', formats: :html, layout: false
  end
end

class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def to_s
    if url
      url
    else
      '/empty.png'
    end
  end

  def store_dir
    "uploads/#{model.type.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    "#{secure_token(10)}.#{file.extension}" if original_filename.present?
  end

  version :thumb do
    process :resize_to_fill => [60, 60]
  end

  def crop(x, y, w, h, all_h, all_w)
    image = MiniMagick::Image.open(path)
    o_h = image['height'].to_f
    o_w = image['width'].to_f
    all_h = all_h.to_f
    all_w = all_w.to_f
    x = (x.to_i * o_w / all_w).to_i
    y = (y.to_i * o_h / all_h).to_i
    h = (h.to_i * o_h / all_h).to_i
    w = (w.to_i * o_w / all_w).to_i
    manipulate! do |img|
      img.crop("#{w}x#{h}+#{x}+#{y}")
    end
  end

  protected
    def secure_token(length=16)
      var = :"@#{mounted_as}_secure_token"
      model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.hex(length/2))
    end
end

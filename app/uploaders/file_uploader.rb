class FileUploader < CarrierWave::Uploader::Base
  CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
  include CarrierWave::MiniMagick

  storage :file
  process resize_to_limit: [800, nil], if: :is_image?

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def is_image? file
    %w(jpg jpeg gif png).include?(file.extension.downcase)
  end
end


json.description @material.description
json.form_link material_path(@material)
json.html_id "material#{@material.id}"
json.main_image_id @material.main_image.id  if @material.main_image
json.attachment_ids @material.files_ids
json.tag @material.subject_id if @material.subject_id
if @material.main_image
  json.main_photo render partial: "main_image", formats: :html
end

array_of_images_in_html = @material.images.map do |i|
  render partial: "image", object: i, formats: :html
end

json.images do
  json.array! array_of_images_in_html
end

array_of_documents_in_html = @material.files.map do |i|
  render partial: "file", object: i, formats: :html
end

json.files do
  json.array! array_of_documents_in_html
end

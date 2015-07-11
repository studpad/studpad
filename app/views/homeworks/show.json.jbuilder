
json.description @homework.description
json.form_link classroom_homework_path(classroom_id, @homework)
json.attachment_ids @homework.attachments.ids
json.html_id "homework#{@homework.id}"

json.tag @homework.subject_id if @homework.subject_id

array_of_files_in_html = @homework.attachments.map do |a|
  render partial: "materials/file", object: a, formats: :html
end

json.files do
  json.array! array_of_files_in_html
end

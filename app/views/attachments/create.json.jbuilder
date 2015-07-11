
elem_id = "attachment" + @a.id.to_s
json.id @a.id
json.link @a.file.url
json.remove_link (link_to '×', attachment_path(@a),
  method: :delete, remote: true, id: elem_id, class: 'X18')
json.type @a.type
json.name truncate(@a.file.file.filename, length: 20)

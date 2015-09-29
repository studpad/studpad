json.array! @posts do |n|
  json.author do
    json.name n.user.name
    json.url user_path(n.user)
    json.avatar n.user.avatar.to_s
  end
  json.id n.id
  json.url post_path(n)
  json.text n.text
  json.type n.post_type
  json.linkdata n.linkdata
  json.title n.title
  json.time n.created_at.strftime('%d %b %H:%M')
  json.can_edit policy(n).update?
  json.can_remove policy(n).destroy?
  json.attachment_ids = n.attachment_ids
  json.files do
    json.array! n.attachments do |a|
      json.name a.file.file.filename
      json.url a.file.to_s
    end
  end
  json.text_elements do
    json.array! n.text_elements do |e|
      json.id e.id
      json.type e.text_type
      json.url e.image.to_s
      json.text e.text
    end
  end
end

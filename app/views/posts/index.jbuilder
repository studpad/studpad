json.array! @posts do |p|
  json.author do
    json.type p.user.description
    json.name p.user.name
    json.url user_path(p.user)
    json.avatar p.user.avatar.thumb.to_s
  end
  json.id p.id
  json.url post_path(p)
  json.text p.text
  json.type p.post_type
  json.linkdata p.linkdata
  json.title p.title
  json.time l(p.created_at)
  json.can_edit policy(p).update?
  json.can_remove policy(p).destroy?
  json.attachment_ids = p.attachment_ids
  json.likes p.votes_for.size
  json.like_path like_post_path(p)
  json.current_like (current_user ? current_user.voted_for?(p) : false)
  json.files do
    json.array! p.attachments do |a|
      json.id a.id
      json.name truncate(a.file.file.filename, length: 40)
      json.url a.file.to_s
    end
  end
  json.text_elements do
    json.array! p.text_elements do |e|
      json.id e.id
      json.type e.text_type
      json.url e.image.to_s
      json.text e.text
    end
  end
  json.comments do
    json.array! p.comments do |c|
      json.url comment_path(c)
      json.id c.id
      json.text c.text
      json.can_edit policy(c).update?
      json.can_remove policy(c).destroy?
      json.author do
        json.name c.user.name
        json.url user_path(c.user)
        json.type c.user.description
        json.avatar c.user.avatar.thumb.to_s
      end
      json.time l(c.created_at)
    end
  end
end

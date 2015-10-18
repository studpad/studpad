json.array! @comments do |c|
  json.url comment_path(c)
  json.id c.id
  json.text c.text
  json.can_edit policy(c).update?
  json.can_remove policy(c).destroy?
  json.author do
    json.name c.user.name
    json.url user_path(c.user)
    json.avatar c.user.avatar.thumb.to_s
  end
  json.time c.created_at.strftime("%d %b %H:%M")
end

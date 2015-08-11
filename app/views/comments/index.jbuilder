json.array! @comments do |c|
  json.url comment_path(c)
  json.id c.id
  json.text c.text
  json.author do
    json.name c.user.name
    json.url user_path(c.user)
    json.avatar c.user.avatar_safe_url
  end
  json.avatarUrl c.user.avatar_safe_url
  json.time c.created_at.strftime("%d %b %H:%M")
end

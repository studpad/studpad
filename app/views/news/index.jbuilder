json.array! @newsItems do |n|
  json.author n.user.name
  json.avatarUrl n.user.avatar_safe_url
  json.text n.text
end

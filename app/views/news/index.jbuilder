json.array! @newsItems do |n|
  json.author do
    json.name n.user.name
    json.url user_path(n.user)
    json.avatar n.user.avatar_safe_url
  end
  json.id n.id
  json.url news_path(n)
  json.text n.text
  json.time n.created_at.strftime("%d %b %H:%M")
  json.comments do
    json.array! n.comments do |c|
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
  end
end

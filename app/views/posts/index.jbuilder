json.array! @posts do |n|
  json.author do
    json.name n.user.name
    json.url user_path(n.user)
    json.avatar n.user.avatar.to_s
  end
  json.id n.id
  json.url post_path(n)
  json.text n.text
  json.post_type n.post_type
  json.title n.title
  json.time n.created_at.strftime("%d %b %H:%M")
  json.can_edit policy(n).update?
  json.can_remove policy(n).destroy?
  json.comments do
    json.array! n.comments do |c|
      json.url comment_path(c)
      json.id c.id
      json.text c.text
      json.can_edit policy(c).update?
      json.can_remove policy(c).destroy?
      json.author do
        json.name c.user.name
        json.url user_path(c.user)
        json.avatar c.user.avatar.to_s
      end
      json.time c.created_at.strftime("%d %b %H:%M")
    end
  end
end

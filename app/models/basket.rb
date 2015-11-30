class Basket < ActiveRecord::Base
  belongs_to :user

  def posts
    Post.where(id: post_ids)
  end

  def in?(post_id)
    post_ids.include?(post_id.to_s)
  end

  def toggle_add(post)
    if in?(post.id)
      self.post_ids.delete(post.id.to_s)
      post.user_add_ids.delete(user.id.to_s)
      post.save!
      Notification.basket.where(
        user: post.user,
        who: self.user,
        post: post).destroy_all
    else
      self.post_ids.push(post.id.to_s)
      post.user_add_ids.push(user.id.to_s)
      post.save!
      Notification.basket.create!(
        user: post.user,
        who: self.user,
        post: post
        )
    end
    save!
  end
end

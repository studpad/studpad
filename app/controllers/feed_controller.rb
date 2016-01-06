class FeedController < ApplicationController
  skip_before_filter :require_login

  def show
  end

  def explore
    if params[:category_name]
      @category = Category.find_by_name(params[:category_name])
      @tag_name = params[:category_name]
      @posts_path = @category ? category_path(@category) : posts_path
    else
      @tag = Tag.find_by_name(params[:tag_name])
      @tag_name = params[:tag_name] ? ('#' + params[:tag_name]) : 'Популярное'
      @posts_path = @tag ? tag_path(@tag) : posts_path
    end
  end

  def fresh
    respond_to do |f|
      f.json do
        @posts = Post.order(created_at: :desc).limit(params[:count])
        render 'posts/index'
      end
      f.html {}
    end
  end

  def fotos
    respond_to do |f|
      f.json do
        @posts = Post.where(post_type: Post.post_types[:photo])
          .order(created_at: :desc).limit(params[:count])
        render 'posts/index'
      end
      f.html {}
    end
  end

  def video
    respond_to do |f|
      f.json do
        @posts = Post.where(post_type: Post.post_types[:video])
          .order(created_at: :desc).limit(params[:count])
        render 'posts/index'
      end
      f.html {}
    end
  end

  def recommend
    respond_to do |f|
      f.json do
        @posts = Post.recommended
          .order(created_at: :desc).limit(params[:count])
        render 'posts/index'
      end
      f.html {}
    end
  end

  def popular
    respond_to do |f|
      f.json do
        @posts = Post.order(cached_votes_total: :desc)
          .where('created_at >= ?', 2.weeks.ago)
          .limit(params[:count])
        render 'posts/index'
      end
      f.html {}
    end
  end
end

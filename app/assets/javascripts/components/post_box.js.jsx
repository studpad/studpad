const PostBox = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    group_id: React.PropTypes.number,
    //show_panel: React.PropTypes.boolean,
    posts_url: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      limit_detected: false,
      wait_posts: false,
      posts_count: 10,
      posts: []
    };
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    $(window).scroll(function() {
      var scroll_part = $(window).scrollTop()/$(document).height();
      if (scroll_part > 0.8 && !this.state.limit_detected && !this.state.wait_posts ){
        this.setState({
          posts_count: this.state.posts_count + 10,
          wait_posts: true
        });
        this.loadPostsFromServer();
        CI("scrolling", scroll_part);
      }
    }.bind(this));
    //intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
  },
  componentWillUnmount: function(){
    $(window).unbind('scroll');
    //clearInterval(intervalID)
  },
  //END*****************************************************DECLARE
  //BEGIN***************************************************ACTIONS
  newPost: function(postType) {
    this.refs.form.newPost(postType);
    CI('PostBox::newPost', postType);
  },
  updatePost: function(postData){
    var newPosts = this.state.posts.map(function (n) {
      if (n.id == postData.id){
        n = postData;
      }
      return n;
    });
    this.setState({posts: newPosts});
    CI('PostBox::updatePost', postData);
    var attachment_ids = postData.files.map(function(f){ return f.id });
    var photo_ids = postData.photos.map(function(p){ return p.id })
    postData.photo_ids = photo_ids;
    $.ajax({
      url: postData.url,
      //dataType: 'json',
      type: 'PATCH',
      data: {
        post : postData
      },
      success: function(data) {
        this.loadPostsFromServer();
      }.bind(this)
    });
  },
  createPost: function(postData) {
    var oldPosts = this.state.posts;
    var newPost = [{
      id: Date.now(),//random id for first
      type: postData.type,
      title: postData.title,
      text_elements: postData.text_elements,
      author: currentUser,
      city_id: postData.city_id,
      youtube_id: postData.youtube_id,
      photos: postData.photos,
      tags: [],
      linkdata: {},
      files: [],
      comments: []
    }];
    var newPosts = newPost.concat(oldPosts);
    this.setState({posts: newPosts});
    var attachment_ids = postData.files.map(function(f){ return f.id })
    var photo_ids = postData.photos.map(function(p){ return p.id })
    CI('Send post data to server', postData);
    post = {
      text: postData.text,
      tags: postData.tags,
      youtube_id: postData.youtube_id,
      group_id: this.props.group_id,
      city_id: postData.city_id,
      title: postData.title,
      post_type: postData.type,
      attachment_ids: attachment_ids,
      photo_ids: photo_ids,
      text_elements: postData.text_elements,
      linkdata: postData.linkdata
    };
    $.ajax({
      url: '/posts',
      //dataType: 'json',
      type: 'POST',
      data: {post: post},
      success: function(data) {
        this.loadPostsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    CI('PostBox::createPost', postData);
  },
  editPost: function(id) {
    var posts = this.state.posts;
    var editedPost = $.grep(posts, function(e){ return e.id == id; });
    editedPost = editedPost[0];
    this.refs.form.editPost(editedPost);
    CI('PostBox::editPost', id);
  },
  createComment: function(post_id, text){
    CI('PostBox::createComment', post_id, text);
    var newPosts = this.state.posts.map(function (n) {
      if (n.id == post_id){
        n.comments.unshift({
          id: Date.now(),
          text: text,
          author: currentUser
        })
      }
      return n;
    });
    this.setState({posts: newPosts});
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: {
        comment: {
          text: text,
          commentable_id: post_id,
          commentable_type: 'Post'
        }
      },
      success: function(data) {
        this.loadPostsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  removeComment: function(post_id, comment_id){
    CI('PostBox::removeComment', post_id, comment_id);
    var delete_url;
    var newPosts = this.state.posts.map(function (n) {
      if (n.id == post_id){
        n.comments = n.comments.filter(function(c){
          if (c.id == comment_id)
            delete_url = c.url;
          return c.id != comment_id;
        });
      }
      return n;
    });
    this.setState({posts: newPosts});
    $.ajax({
      url: delete_url,
      type: 'DELETE'
    });
  },
  updateComment: function(post_id, comment_id, text){
    CI('PostBox::removeComment', post_id, comment_id, text);
    var comment_url;
    var newPosts = this.state.posts.map(function (n) {
      if (n.id == post_id){
        n.comments = n.comments.map(function(c){
          if (c.id == comment_id){
            comment_url = c.url;
            c.text = text;
          }
          return c;
        });
      }
      return n;
    });
    this.setState({posts: newPosts});
    $.ajax({
      url: comment_url,
      type: 'PATCH',
      data: {
        comment : {
          text: text
        }
      },
    });
  },
  likePost: function(id) {
    var posts = this.state.posts;
    var likedPost = $.grep(posts, function(e){ return e.id == id; });
    likedPost = likedPost[0];
    CI('PostBox::likePost', id);
    posts = posts.map(function(p){
      if (p.id == id){
        if (p.current_like){
          p.likes -= 1;
          p.current_like = false;
          p.current_like_just = false;
        } else {
          p.likes += 1;
          p.current_like = true
          p.current_like_just = true;
        }
      }
      return p;
    })
    this.setState({posts: posts});
    $.ajax({
      url: likedPost.like_path,
      type: 'PUT',
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  addPostToBasket: function(id) {
    var posts = this.state.posts;
    var thisPost = $.grep(posts, function(e){ return e.id == id; });
    thisPost = thisPost[0];
    CI('PostBox::addPostToBasket', id);
    posts = posts.map(function(p){
      if (p.id == id){
        if (p.current_basket){
          p.baskets_count -= 1;
          p.current_basket = false;
        } else {
          p.baskets_count += 1;
          p.current_basket = true;
        }
      }
      return p;
    })
    this.setState({posts: posts});
    $.ajax({
      url: thisPost.basket_path,
      type: 'PUT',
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  removePost: function(id) {
    var posts = this.state.posts;
    var newPosts = $.grep(posts, function(e){ return e.id != id; });
    var deletedPost = $.grep(posts, function(e){ return e.id == id; });
    deletedPost = deletedPost[0]
    this.setState({posts: newPosts});
    $.ajax({
      url: deletedPost.url,
      type: 'DELETE'
    });
    CI('PostBox::removePost', id);
  },
  //END*****************************************************ACTIONS
  //BEGIN***************************************************HELPERS
  loadPostsFromServer: function() {
    $.ajax({
      url: this.props.posts_url,
      dataType: 'json',
      data: {
        count: this.state.posts_count
      },
      cache: false,
      success: function(data) {
        var limit_detected = (data.length < this.state.posts_count);
        this.setState({
          posts: data,
          limit_detected: limit_detected
        });
        this.setState({
          wait_posts: false
        });
      }.bind(this),
      error: function(xhr, status, err) {
        CE(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  //END*****************************************************HELPERS
  render: function() {
    if (this.props.show_panel)
      var panel = <PostManagementPanel newPost={this.newPost}/>;
    return (
      <div>
        {panel}
        <PostModalForm
          ref='form'
          createPost={this.createPost}
          updatePost={this.updatePost}
          />
        <PostList
          posts={this.state.posts}
          likePost={this.likePost}
          addPostToBasket={this.addPostToBasket}
          createComment={this.createComment}
          removeComment={this.removeComment}
          updateComment={this.updateComment}
          removePost={this.removePost}
          editPost={this.editPost}/>
      </div>
    );
  }
})


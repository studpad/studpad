const PostBox = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    group_id: React.PropTypes.number,
    posts_url: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      posts: []
    };
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    //intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
  },
  componentWillUnmount: function(){
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
    postData.attachment_ids = attachment_ids;
    $.ajax({
      url: postData.url,
      dataType: 'json',
      type: 'PATCH',
      data: {
        post : postData
      },
      success: function(data) {
        this.setState({posts: data});
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
      linkdata: {},
      files: []
    }];
    var newPosts = newPost.concat(oldPosts);
    this.setState({posts: newPosts});
    var attachment_ids = postData.files.map(function(f){ return f.id })
    CI('Send post data to server', postData);
    post = {
      text: postData.text,
      group_id: this.props.group_id,
      title: postData.title,
      post_type: postData.type,
      attachment_ids: attachment_ids,
      text_elements: postData.text_elements,
      linkdata: postData.linkdata
    };
    $.ajax({
      url: '/posts',
      dataType: 'json',
      type: 'POST',
      data: {post: post},
      success: function(data) {
        this.setState({posts: data});
        console.log(data)
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
      cache: false,
      success: function(data) {
        this.setState({posts: data});
      }.bind(this),
      error: function(xhr, status, err) {
        CE(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  //END*****************************************************HELPERS
  render: function() {
    return (
      <div>
        <PostManagementPanel
          newPost={this.newPost}/>
        <PostModalForm
          ref='form'
          createPost={this.createPost}
          updatePost={this.updatePost}
          />
        <PostList
          posts={this.state.posts}
          removePost={this.removePost}
          editPost={this.editPost}/>
      </div>
    );
  }
})


/*

  editPost: function(id){
    console.info('update Post in PostBox', id)
    var Posts = this.state.posts;
    var editedPost = $.grep(Posts, function(e){ return e.id == id; });
    editedPost = editedPost[0];
    this.setState({
      showModal: true,
      type: editedPost.type
    });
    this.refs.post_form.editPost(editedPost);
  },*/
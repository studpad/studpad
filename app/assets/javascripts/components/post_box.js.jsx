const PostBox = React.createClass({
  propTypes: {
    group_id: React.PropTypes.number,
    posts_url: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {showModal: false, posts: []};
  },
  initModalForm: function(type) {
    this.setState({showModal: true, type: type})
  },
  hideModalForm: function() {
    this.setState({showModal: false})
  },
  loadPostsFromServer: function() {
    $.ajax({
      url: this.props.posts_url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({posts: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    //intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
  },
  componentWillUnmount: function(){
    //clearInterval(intervalID)
  },
  createPost: function(postData) {
    var oldPosts = this.state.posts;
    var newPost = [{
      id: Date.now(),//random id for first
      type: postData.type,
      text: postData.text,
      title: postData.title,
      author: currentUser,
      linkdata: {},
      attachments: []
    }];
    var newPosts = newPost.concat(oldPosts);
    this.setState({posts: newPosts});
    console.info('Send post data to server', postData);
    post = {
      'post[text]': postData.text,
      'post[group_id]': this.props.group_id,
      'post[title]': postData.title,
      'post[post_type]': postData.type,
      'post[attachment_ids]': postData.attachment_ids,
      'post[linkdata][url]': postData.linkdata.url,
      'post[linkdata][title]': postData.linkdata.title,
      'post[linkdata][domain]': postData.linkdata.domain,
      'post[linkdata][description]': postData.linkdata.description,
    };
    $.ajax({
      url: '/posts',
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(data) {
        this.setState({posts: data});
        console.log(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  removePost: function(id){
    console.info("remove Post", id, "in PostBox")
    var Posts = this.state.posts
    var newPosts = $.grep(Posts, function(e){ return e.id != id; });
    var deletedPost = $.grep(Posts, function(e){ return e.id == id; });
    deletedPost = deletedPost[0]
    this.setState({posts: newPosts});
    $.ajax({
      url: deletedPost.url,
      type: 'DELETE'
    });
  },
  editPost: function(id){
    console.info("update Post in PostBox", id)
  },
  render: function() {
    return (
      <div>
        <PostManagementPanel initModalForm={this.initModalForm}/>
        <PostModalForm
          createPost={this.createPost}
          show={this.state.showModal}
          type={this.state.type}
          hideModalForm={this.hideModalForm}/>
        <PostList
          data={this.state.posts}
          removePost={this.removePost}
          editPost={this.editPost}/>
      </div>
    );
  }
})

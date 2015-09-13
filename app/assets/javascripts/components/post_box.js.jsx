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
      id: 12,
      text: postData.text,
      title: postData.title,
      author: currentUser,
      comments: []
    }];
    var newPosts = newPost.concat(oldPosts);
    this.setState({posts: newPosts});
    //return console.info(postData);
    post = {
      'post[text]': postData.text,
      'post[group_id]': this.props.group_id,
      'post[title]': postData.title,
      'post[post_type]': postData.post_type,
    };
    $.ajax({
      url: '/posts',
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(data) {
        //this.setState({data: data});
        console.log(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
          updatePost={this.updatePost}/>
      </div>
    );
  }
})

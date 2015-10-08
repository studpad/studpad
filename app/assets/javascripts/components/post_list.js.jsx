const PostList = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    editPost: React.PropTypes.func.isRequired,
    likePost: React.PropTypes.func.isRequired,
    removePost: React.PropTypes.func.isRequired,
    data: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired
    })
  },
  //END*****************************************************DECLARE
  render: function() {
    var posts = this.props.posts.map(function (post) {
      return (
        <Post
          key={post.id}
          post={post}
          likePost={this.props.likePost}
          removePost={this.props.removePost}
          editPost={this.props.editPost}/>
      );
    }.bind(this));
    return (
      <div className='post-container'>
        {posts}
      </div>
    );
  }
});

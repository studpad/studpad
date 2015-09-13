const PostList = React.createClass({
  render: function() {
    var removePost = this.props.removePost;
    var updatePost = this.props.updatePost;
    var posts = this.props.data.map(function (n) {
      return (
        <Post
        key={n.id} data={n}
        removePost={removePost}
        updatePost={updatePost}/>
      );
    });
    return (
      <div className="post-container">
        {posts}
      </div>
    );
  }
});

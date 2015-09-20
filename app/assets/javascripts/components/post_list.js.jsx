const PostList = React.createClass({
  render: function() {
    var posts = this.props.data.map(function (n) {
      return (
        <Post
        key={n.id} data={n}
        removePost={this.props.removePost}
        editPost={this.props.editPost}/>
      );
    }.bind(this));
    return (
      <div className="post-container">
        {posts}
      </div>
    );
  }
});

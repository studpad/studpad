var PostBox = React.createClass({
  render: function() {
    // return (
    //   <div className="postBox">
    //     <PostForm onPostSubmit={this.handlePostSubmit}/>
    //     <PostList
    //       data={this.state.data}
    //       removePost={this.removePost}
    //       updatePost={this.updatePost}/>
    //   </div>
    // );
    return (
      <div>
        <PostManagementPanel />
        <PostForm />
        <PostList data={[]}/>
      </div>
    );
  }
})

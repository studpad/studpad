var CommentList = React.createClass({
  getInitialState() {
    return {
      show_all: false
    };
  },
  showMoreClick: function(){
    this.setState({show_all: true});
  },
  hideMoreClick: function(){
    this.setState({show_all: false});
  },
  render: function () {
    var comments = this.props.comments;
    if (!this.state.show_all){
      comments = comments.slice(-3);
    }
    comments = comments.map(function (c) {
      return (
        <Comment
          key={c.id}
          updateComment={this.props.updateComment}
          removeComment={this.props.removeComment}
          comment={c}/>
      );
    }.bind(this));
    var button;
    if (this.props.comments.length > 3){
      if (this.state.show_all){
        button = (
          <div className='show-all-comments'>
            <span onClick={this.hideMoreClick}>Скрыть комментарии</span>
          </div>
        );
      } else {
        button =(
          <div className='show-all-comments'>
            <span onClick={this.showMoreClick}>Показать все комментарии</span>
          </div>
        );
      }
    }
    return(
      <div>
        {button}
        <div className='post-comments'>
          {comments}
        </div>
      </div>
    )
  }
});


  // getInitialState: function() {
  //   return {
  //     comments: this.props.comments,
  //     commentable: false
  //   };
  // },
  // toggleCommentable: function(){
  //   this.setState({commentable: !this.state.commentable});
  // },
  // removeComment: function(id){
  //   var Comments = this.state.comments
  //   var newComments = $.grep(Comments, function(e){ return e.id != id; });
  //   var deletedComment = $.grep(Comments, function(e){ return e.id == id; });
  //   deletedComment = deletedComment[0]
  //   this.setState({comments: newComments});
  //   $.ajax({
  //     url: deletedComment.url,
  //     type: 'DELETE'
  //   });
  // },
  // updateComment: function(id, text){
  //   var url;
  //   var newComments = this.state.comments.map(function (n) {
  //     if (n.id == id){
  //       url = n.url;
  //       n.text = text;
  //     }
  //     return n;
  //   });
  //   c(newComments)
  //   this.setState({comments: newComments});
  //   $.ajax({
  //     url: url,
  //     dataType: 'json',
  //     type: 'PATCH',
  //     data: {
  //       'comment[text]' : text
  //     },
  //     success: function(data) {
  //       c(data);
  //       this.setState({comments: data});
  //     }.bind(this)
  //   });
  // },
  // sendComment: function(text){
  //   this.toggleCommentable();
  //   var comments = this.state.comments;
  //   console.log(currentUser);
  //   var piece = [{
  //       text: text,
  //       author: currentUser
  //     }];
  //   var newComments = piece.concat(comments);
  //   this.setState({comments: newComments});
  //   newComment = {
  //     'comment[text]': text,
  //     'comment[commentable_id]': this.props.postId,
  //     'comment[commentable_type]': 'NewsItem'
  //   }
  //   newComment.utf8 = "✓";
  //   $.ajax({
  //     url: '/comments',
  //     dataType: 'json',
  //     type: 'POST',
  //     data: newComment,
  //     success: function(data) {
  //       c(data);
  //       this.setState({comments: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  //   console.log(text);
  // },
  // var removeComment = this.removeComment;
    // var updateComment = this.updateComment;
    // var comments = this.state.comments;
    // comments = comments.map(function (c) {
    //   return (
    //     <Comment
    //       key={c.id}
    //       data={c}
    //       updateComment={updateComment}
    //       remove={removeComment} />
    //   );
    // });
    // return (
    //   <div>
    //     <div classNameName='form-send-comment-of-news'>
    //       <div classNameName='menu-of-form-send-comment-of-news'>
    //         <span classNameName='date-news'>{this.props.time}</span>&nbsp;&nbsp;
    //         <span classNameName='give-comment' onClick={this.toggleCommentable}>Комментировать</span>
    //       </div>
    //     </div>
    //     <CommentForm visible={this.state.commentable} sendComment={this.sendComment}/>
    //     <div classNameName = 'each-comment-of-the-news'>
    //       {comments}
    //     </div>
    //   </div>
    // );

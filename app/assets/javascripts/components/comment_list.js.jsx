var CommentList = React.createClass({
  showMoreClick: function(){

  },
  render: function () {
    var comments = this.props.comments;
    comments = comments.map(function (c) {
      return (
        <Comment
          key={c.id}
          removeComment={this.props.removeComment}
          comment={c}/>
      );
    }.bind(this));
    var style = {
        background: 'url(/uploads/student/avatar/1/thumb_aa0ce8f989.jpg) no-repeat',
        backgroundSize: 'cover'
    };
    return(
      <div className='post-comments'>
        {comments}
        <div className="unit-post-comments">
          <div className="preview-object">
            <div className="preview-object-avatar-mini" style={style}>
            </div>
            <div className="preview-object-info-mini">
              <div className="object-text">
                <div className="object-maintext">
                  <a href="/users/1">Никитин Максим</a>
                  <span className="status-user-line">
                    <span> • </span><span> </span><span>Ученик</span></span><span className="post-autor-data"><span> • </span><span>19 окт.</span></span>
                </div>
                <textarea className="form-control textarea-form-control-comment" placeholder="Введите комментарий">fds</textarea>
              </div>
            </div>
            <div className="clearboth">
            </div>
          </div>
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

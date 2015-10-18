const PostCommentBox = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    createComment: React.PropTypes.func.isRequired,
    removeComment: React.PropTypes.func.isRequired,
    comments: React.PropTypes.array,
    likeClick: React.PropTypes.func.isRequired,
    current_like: React.PropTypes.bool.isRequired,
    current_like_just: React.PropTypes.bool.isRequired,
    likes: React.PropTypes.number.isRequired
  },
  componentDidMount: function() {
    var node = this.refs.commentText.getDOMNode();
    $(node).autoResize({
      limit:600,
      extraSpace:0,
      animate:true
    });
    $(node).on('keydown', this.handleKeyDown);
    $(node).change();
  },
  componentWillUnmount: function() {
    var node = this.refs.commentText.getDOMNode();
    $(node).off('keydown', this.handleKeyDown);
  },
  handleKeyDown: function(e) {
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
      var node = this.refs.commentText.getDOMNode();
      this.props.createComment(node.value);
      $(node).val('');
    }
  },
  //END*****************************************************DECLARE
  render: function() {
    var likes_count = this.props.likes;
    var classname;
    if (likes_count == 0)
      likes_count = '';
    if (this.props.current_like){
      classname = 'post-like post-like-active';
      if (this.props.current_like_just)
        classname += ' post-like-active-animate';
    } else
      classname = 'post-like';

    return (
      <div>
        <div className='wrap-post-comments'>
          <div className='post-footer'>
            <div className='wrap-write-comment-post-footer'>
              <textarea
                ref='commentText'
                className='form-control textarea-form-control-comment'
                placeholder='Введите комментарий'>
              </textarea>
            </div>
            <div className='wrap-like-post-footer'>
              <span
                className={classname}
                onClick={this.props.likeClick}>
                {likes_count}
              </span>
            </div>
          </div>
          <div className='clearboth'>
          </div>
          <CommentList
            removeComment={this.props.removeComment}
            comments={this.props.comments}/>
          <div className='show-all-comments'>
            <span>Показать все комментарии</span>
          </div>
        </div>
      </div>
    );
  }
})

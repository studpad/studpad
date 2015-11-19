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
    var node = this.refs.ceditable.getDOMNode();
    $(node).emojiarea({
      buttonLabel: '&#9786;',
      buttonPosition: 'before',
    });
    $(node).next().next().on('keydown', this.handleKeyDown)
    $(node).next().next().attr("placeholder", "Ваш комментарий");
  },
  handleKeyDown: function(e) {
    CI('keydown');
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
      e.preventDefault();
      var node = this.refs.ceditable.getDOMNode();
      if (!node.value.trim()) return;
      if (currentUser)
        this.props.createComment(node.value);
      $(node).val('');
      $(node).next().next().html('');
    }
  },
  handleChange: function(event){
    this.setState({new_comment: event.target.value});
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
                ref='ceditable'
                onChange={this.handleChange} />
            </div>
            <div className='wrap-like-post-footer'>
              <div>
                <span className='post-box'>
                  <img src='/images/box.png' />
                  <span>
                    2
                  </span>
                </span>
                <span
                  className={classname}
                  onClick={this.props.likeClick}>
                  <img src='/images/like.png' />
                  <span>
                    {likes_count}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className='clearboth'>
          </div>
          <CommentList
            updateComment={this.props.updateComment}
            removeComment={this.props.removeComment}
            comments={this.props.comments}/>
        </div>
      </div>
    );
  }
})



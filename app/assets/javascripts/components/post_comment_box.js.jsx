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
    var node = this.refs.ceditable;
    $(node).emojiarea({
      buttonLabel: '&#9786;',
      buttonPosition: 'before',
    });
    $(node).next().next().on('keydown', this.handleKeyDown)
    $(node).next().next().attr("placeholder", "Введите комментарий и нажмите Enter");

    var delicious_tooltip = this.refs.delicious_tooltip;
    $(delicious_tooltip).tooltip();

  },
  handleKeyDown: function(e) {
    CI('keydown');
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
      e.preventDefault();
      var node = this.refs.ceditable;
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
    var baskets_count = this.props.baskets_count;
    var classname, classname_img;
    var like_image_path, basket_image_path;

    if (likes_count == 0)
      likes_count = '';
    if (baskets_count == 0)
      baskets_count = '';

    if (this.props.current_basket){
      basket_image_path = '/images/delicious_active.png';
    } else {
      basket_image_path = '/images/delicious.png';
    }
    if (this.props.current_like){
      like_image_path = '/images/like_active.png';
      classname = 'post-like post-like-active';
      if (this.props.current_like_just)
        classname_img += ' post-like-active-animate';
    } else {
      like_image_path = '/images/like.png';
      classname = 'post-like';
    }

    if (window.currentUser)
    var comment_form =  (
      <textarea
        ref='ceditable'
        onChange={this.handleChange} />
    );
    if (!this.props.hide_like)
      var like_box = (
        <div className='wrap-like-post-footer'>
          <div>
            <span
              className={classname}
              onClick={this.props.likeClick}>
              <img
                src={like_image_path}
                className={classname_img}/>
              <span>
                {likes_count}
              </span>
            </span>
          </div>
        </div>
      );
    return (
      <div>
        <div className='wrap-post-comments'>
          <div className='post-footer'>
            <div className='wrap-write-comment-post-footer'>
              {comment_form}
            </div>
            {like_box}
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



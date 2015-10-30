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
      extraSpace:13,
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
      e.preventDefault();
      var node = this.refs.commentText.getDOMNode();
      if (currentUser)
        this.props.createComment(node.value);
      $(node).val('');
    }
  },
  getInitialState: function() {
    return {html: "", show_emotions: false}
  },
  handleChange: function(event){
      this.setState({html: event.target.value});
  },
  handleClick: function(event){
      this.setState({show_emotions: true});
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
    var httext = this.state.html;

    if(this.state.show_emotions){
      var emotions_list = (<div className='emotions-write-comment'>
        <img className='emotion' src='/smiles/smile1.png' />
        <img className='emotion' src='/smiles/smile7.png' />
        <img className='emotion' src='/smiles/smile4.png' />
        <img className='emotion' src='/smiles/smile9.png' />
        <img className='emotion' src='/smiles/smile2.png' />
        <img className='emotion' src='/smiles/smile6.png' />
        <img className='emotion' src='/smiles/smile5.png' />
        <img className='emotion' src='/smiles/smile8.png' />
      </div>);
    }
    return (
      <div>
        <div className='wrap-post-comments'>
          <div className='post-footer'>
            <div className='wrap-write-comment-post-footer'>
              
              <div contentEditable='true' className='textarea-form-control-comment' onChange={this.handleChange} onClick={this.handleClick}>
               {httext}
              </div>
              {emotions_list}
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
            updateComment={this.props.updateComment}
            removeComment={this.props.removeComment}
            comments={this.props.comments}/>
        </div>
      </div>
    );
  }
})

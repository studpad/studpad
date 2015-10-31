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
    // var node = this.refs.commentText.getDOMNode();
    // $(node).autoResize({
    //   limit:600,
    //   extraSpace:13,
    //   animate:true
    // });
    // $(node).on('keydown', this.handleKeyDown);
    // $(node).change();
  },
  componentWillUnmount: function() {
    // var node = this.refs.commentText.getDOMNode();
    // $(node).off('keydown', this.handleKeyDown);
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
    return {
      new_comment: "<img class='emotion' src='/smiles/smile1.png' />",
      show_emotions: false
    }
  },
  handleChange: function(event){
    CL('change text');
    this.setState({new_comment: event.target.value});
  },
  handleClick: function(event){
    this.setState({show_emotions: true});
  },
  addSmile: function(smile_id){
    var current_text = this.state.new_comment;
    current_text = current_text + "<img class='emotion' src='/smiles/smile7.png' />";
    this.setState({new_comment: current_text});
    this.refs.ceditable.focus();
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

    if(this.state.show_emotions){
      var emotions_list = (
        <div className='emotions-write-comment'>
          <img onClick={this.addSmile} className='emotion' src='/smiles/smile1.png' />
          <img className='emotion' src='/smiles/smile7.png' />
          <img className='emotion' src='/smiles/smile4.png' />
          <img className='emotion' src='/smiles/smile9.png' />
          <img className='emotion' src='/smiles/smile2.png' />
          <img className='emotion' src='/smiles/smile6.png' />
          <img className='emotion' src='/smiles/smile5.png' />
          <img className='emotion' src='/smiles/smile8.png' />
        </div>
      );
    }
    return (
      <div>
        <div className='wrap-post-comments'>
          <div className='post-footer'>
            <div className='wrap-write-comment-post-footer'>
              <ContentEditable
                ref='ceditable'
                handleClick={this.handleClick}
                html={this.state.new_comment}
                onChange={this.handleChange} />
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

$.fn.setCursorPosition = function(pos) {
  this.each(function(index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });
  return this;
};

var ContentEditable = React.createClass({
    render: function(){
      return <div
        ref='text'
        onInput={this.emitChange}
        onBlur={this.emitChange}
        onClick={this.handleClick}
        placeholder="Введите комментарий"
        className='textarea-form-control-comment'
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    },
    shouldComponentUpdate: function(nextProps){
      return nextProps.html !== this.getDOMNode().innerHTML;
    },
    focus: function(){
      var node = this.refs.text.getDOMNode();
      $(node).focus();
      //var l = $(node).html().length;
      //CI('end', l);
      //var r = node.createTextRange();
      // r.moveStart("character", l);
      //r.moveEnd("character", l);
      // r.select();
      //window.getSelection().setPosition(3);
      //$(node).setCursorPosition(3);
    },
    handleClick: function(){
      this.props.handleClick();
    },
    emitChange: function(){
      var html = this.getDOMNode().innerHTML;
      if (this.props.onChange && html !== this.lastHtml) {
        this.props.onChange({
          target: {
            value: html
          }
        });
      }
      this.lastHtml = html;
    }
});
// <div
//   contentEditable='true'
//   placeholder="Введите комментарий"
//   className='textarea-form-control-comment'
//   onChange={this.handleChange}
//   onClick={this.handleClick}
//   dangerouslySetInnerHTML={{__html: this.state.new_comment}}>
// </div>

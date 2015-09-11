var Post = React.createClass({
  getInitialState: function() {
    return {
      editable: false
    };
  },
  removeClick: function(){
    this.props.removePost(this.props.data.id);
  },
  editClick: function(){
    this.setState({editable: !this.state.editable});
  },
  updateClick: function(){
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.setState({editable: false});
    this.props.updatePost(this.props.data.id, text);
  },
  render: function() {
    var mainPart;
    if (this.state.editable) {
      mainPart = (
        <div>
          <textarea ref='text' className='form-control textHW-update'
          defaultValue={this.props.data.text}/>
          <div className='wrap-send-button'>
            <button className="btn btn-primary btn-xs btn-st change-news"
            onClick={this.updateClick}>
              Сохранить
            </button>
          </div>
        </div>
        )
    } else {
      mainPart =(
        <div className='main-text-news'>
          <span className='span-main-text-news'>
           {this.props.data.text}
          </span>
        </div>
      )
    }
    var remove_link;
    if (this.props.data.can_remove) {
      remove_link = (
        <span
          className="glyphicon glyphicon-remove"
          onClick={this.removeClick}>
        </span>
        );
    }
    var edit_link;
    if (this.props.data.can_edit) {
      edit_link = (
        <span
          className="glyphicon glyphicon-pencil pencil-news"
          onClick={this.editClick}>
        </span>
        );
    }
    return (
      <div id = 'form-send-news'>
      <div className='the-news row'>
        <div className='col-xs-1 wrap-avatar-news'>
          <img src={this.props.data.author.avatar} className='img-avatar'/>
        </div>
        <div className='col-xs-11'>
          <div className='content-the-news'>
            <div className='sign-sp close-news'>
              {edit_link}
              &nbsp;&nbsp;
              {remove_link}
            </div>
            <div className='news-username'>
              <a href={this.props.data.author.url}>
                {this.props.data.author.name}
              </a>
            </div>
            {mainPart}
            <CommentBox
              postId={this.props.data.id}
              comments={this.props.data.comments}
              time={this.props.data.time}/>
          </div>
        </div>
      </div>
      </div>
    );
  }
});

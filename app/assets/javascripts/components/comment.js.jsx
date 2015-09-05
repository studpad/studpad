var Comment = React.createClass({
  removeClick: function(){
    this.props.remove(this.props.data.id)
  },
  render: function() {
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
    //this.props.data.can_edit
    if (false) {
      edit_link = (
        <span
          className="glyphicon glyphicon-pencil pencil-news"
          onClick={this.editClick}>
        </span>
        );
    }
    return(
    <div className='the-comment'>
      <div className='row'>
        <div className='col-xs-1 wrap-avatar-news'>
          <img src={this.props.data.author.avatar} width='40' height='40' className='img-avatar'/>
        </div>
        <div className='col-xs-11 the-comment-content'>
          <div className = 'sign-sp close-news'>
            {edit_link}
            &nbsp;&nbsp;
            {remove_link}
          </div>
          <div className='comment-username'>
          <a href={this.props.data.author.urls}>{this.props.data.author.name}</a>
          </div>
          <div className='main-text-news'>
            <span className='span-main-text-comment'>{this.props.data.text}</span>
          </div>
          <div className='menu-of-form-send-comment-of-news'>
            <span className='date-news'>{this.props.data.time}</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
});

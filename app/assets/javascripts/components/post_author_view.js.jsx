const PostAuthorView = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    editClick: React.PropTypes.func.isRequired,
    removeClick: React.PropTypes.func.isRequired,
    author: React.PropTypes.shape({
      avatar: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired
    })
  },
  //END*****************************************************DECLARE
  render: function() {
    if (this.props.can_edit)
      var edit_button = <li><a href="javascript:void(0);" onClick={this.props.editClick}>Редактировать</a></li>;
    if (this.props.can_remove)
      var remove_button = <li><a href="javascript:void(0);" onClick={this.props.removeClick}>Удалить</a></li>;
    var manage_block = (
      <div className = 'btn-group'>
        <span className = 'sign-dots-menu' data-toggle="dropdown">•••</span>
        <ul className="dropdown-menu blue-background-dropdown-menu" role="menu">
          {edit_button}
          {remove_button}
          <li><a>Пожаловаться</a></li>
        </ul>
      </div>
      );
    return (
      <div className='post-autor'>
        <a href={this.props.author.url}>
          <div className='usual-avatar'
          style={{background: 'url(' + this.props.author.avatar + ') no-repeat',
          backgroundSize: 'cover'}}>
          </div>
          <div className='post-autor-info'>
            <div className='post-autor-name'>
              {this.props.author.name}<span className='post-autor-data'> • {this.props.city_name} • {this.props.time}</span>
            </div>
          </div>
        </a>
        <div className = 'action-angle post-action'>
          {manage_block}
        </div>
      </div>
    );
  }
});

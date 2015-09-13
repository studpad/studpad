const Post = React.createClass({
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
    //console.warn("Inline styles")
    return (
      <div className='post card-sp'>
        <PostAuthor author={this.props.data.author}/>
        <PostContent text={this.props.data.text}/>
      </div>
    );
  }
});

const PostAuthor = React.createClass({
  render: function() {
    return (
      <div className='post-autor'>
        <div className="usual-avatar"
        style={{background: 'url(' + this.props.author.avatar + ') no-repeat',
        backgroundSize: 'cover'}}>
        </div>
        <div className='post-autor-info'>
          <div className='post-autor-name'>
            {this.props.author.name}
          </div>
          <div className = 'post-autor-type'>
            Преподаватель
          </div>
        </div>
      </div>
    );
  }
});

const PostContent = React.createClass({
  render: function() {
    return (
       <div className = 'post-content'>
          <div className = 'post-type'>
            <div className = 'post-type-material'>
              <div className = 'post-type-material-item'>
                <div className = 'post-type-material-icon'>

                </div>
                <div className = 'post-type-material-text'>
                  <a>Сcылка на файл</a>
                </div>
              </div>
              <div className = 'clearboth'>
              </div>
              <div className = 'post-type-material-item'>
                <div className = 'post-type-material-icon'>

                </div>
                <div className = 'post-type-material-text'>
                  <a>Сыылка на файл</a>
                </div>
              </div>
            </div>
          </div>
          <div className = 'clearboth'>
          </div>
          <div className = 'usual-post-contant'>
            <div className = 'usual-post-text'>
              {this.props.text}
            </div>
            <div className = 'usual-post-photo'>
              <img src = 'https://cs7055.vk.me/c7002/v7002049/bed6/aWcSTQMvi7w.jpg' />
            </div>
          </div>
        </div>
    );
  }
});

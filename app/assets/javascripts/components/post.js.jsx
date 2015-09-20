const Post = React.createClass({
  getInitialState: function() {
    return {
      editable: false
    };
  },
  removeClick: function(){
    console.info("Remove Post Click")
    this.props.removePost(this.props.data.id);
  },
  editClick: function(){
    console.info("Edit Post Click")
    this.props.editPost(this.props.data.id);
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
    return (
      <div className='post card-sp'>
        <PostAuthor author={this.props.data.author}
          removeClick={this.removeClick}
          editClick={this.editClick}/>
        <PostContent
          post={this.props.data}/>
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
        <span
          className="glyphicon glyphicon-pencil pencil-news"
          onClick={this.props.editClick}>
        </span>&nbsp;
        <span
          className="glyphicon glyphicon-remove"
          onClick={this.props.removeClick}>
        </span>
      </div>
    );
  }
});

const PostContentFiles = React.createClass({
  render: function() {
    return (
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
    );
  }
});
const PostContent = React.createClass({
  render: function() {
    var main_part;
    switch (this.props.post.type) {
      case PostTypes.text:
        main_part = (
          <div className = 'post-content'>
            <div className = 'clearboth'>
            </div>
            <div className = 'post-type'>
              <div className = 'post-type-text-title'>
                <h2>{this.props.post.title}</h2>
              </div>
            </div>
            <div className = 'usual-post-content'>
              <div className = 'usual-post-text'>
                {this.props.post.text}
              </div>
            </div>
          </div>
        );
        break;
      case PostTypes.link:
        main_part = (
          <div className = 'post-content'>
            <div class = 'post-type'>
              <a href = {this.props.post.linkdata.url}><div className = 'post-type-link extra-background'>
                <header className = 'post-type-link-title'>
                  {this.props.post.linkdata.title}
                </header>
                <div className = 'post-type-link-description'>
                  {this.props.post.linkdata.description}
                </div>
                <div className = 'post-type-link-link'>
                  <span className = 'decor-type-link-link'>{this.props.post.linkdata.domain}</span>
                </div>
              </div></a>
            </div>
          </div>
        );
        break;
      case PostTypes.file:
        var files = this.props.post.attachments.map(function (f, index) {
          return (
            <ModalContentFile
              key={index}
              name={f.name}
              url={f.url} />
          );
        });
        main_part = (
        <div className = 'form-new-post'>
          <div className = 'post-type'>
            <div className = 'post-type-material'>
              {files}
            </div>
          </div>
          <div className = 'clearboth'>
          </div>
        </div>
        );
        break;
      case PostTypes.quotation:
        main_part = (
        <div className = 'post-content'>
          <div className = 'post-type'>
            <div className = 'post-type-cite'>
              "{this.props.post.title}"
            </div>
          </div>
          <div className = 'usual-post-contant'>
            <div className = 'usual-post-text'>
              {this.props.post.text}
            </div>
          </div>
        </div>
        );
        break;
      default:
        console.log("Undefined type");
    }
    return main_part;
  }
});

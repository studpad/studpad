const Post = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    editPost: React.PropTypes.func.isRequired,
    removePost: React.PropTypes.func.isRequired,
    post: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired
    })
  },
  //END*****************************************************DECLARE
  //BEGIN***************************************************ACTIONS
  removeClick: function(){
    var post_id = this.props.post.id;
    CI('Post::removeClick', post_id);
    this.props.removePost(post_id);
  },
  editClick: function(){
    var post_id = this.props.post.id;
    CI('Post::editClick', post_id);
    this.props.editPost(post_id);
  },
  //END*****************************************************ACTIONS
  render: function() {
    return (
      <div className='post card-sp'>
        <PostAuthorView
          author={this.props.post.author}
          removeClick={this.removeClick}
          editClick={this.editClick}/>
        <PostContentView
          post={this.props.post}/>
        <PostTextView
          text_elements={this.props.post.text_elements}/>
      </div>
    );
  }
})

//Post NESTED COMPONENT############################################
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
    return (
      <div className='post-autor'>
        <div className='usual-avatar'
        style={{background: 'url(' + this.props.author.avatar + ') no-repeat',
        backgroundSize: 'cover'}}>
        </div>
        <div className='post-autor-info'>
          <div className='post-autor-name'>
            {this.props.author.name}
          </div>
          <div className = 'post-autor-type'>
            [Преподватель/Ученик]
          </div>
        </div>
        <div className = 'action-angle post-action'>
          <div className = 'btn-group'>
            <span className = 'sign-dots-menu' data-toggle="dropdown">•••</span>
            <ul className="dropdown-menu" role="menu">
              <li>
                <a onClick={this.props.editClick}>Редактировать</a>
              </li>
              <li>
                <a onClick={this.props.removeClick}>Удалить</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

//Post NESTED COMPONENT############################################
const PostContentView = React.createClass({
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
        var files = this.props.post.files.map(function (f, index) {
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
        CE('Undefined PostType');
    }
    return main_part;
  }
});

//Post NESTED COMPONENT############################################
const PostTextView = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    text_elements: React.PropTypes.array.isRequired
  },
  //END*****************************************************DECLARE
  render: function() {
    var rendered_elements = this.props.text_elements.map(function(e, i){
      return <PostTextElementView key={i} element={e} />
    })
    return (
      <div className='post-content'>
        <div className='usual-post-contant'>
          {rendered_elements}
        </div>
      </div>
    );
  }
})

//PostTextView NESTED COMPONENT###################################
const PostTextElementView = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    element: React.PropTypes.shape({
      type: React.PropTypes.string.isRequired
    })
  },
  //END*****************************************************DECLARE
  render: function() {
    switch (this.props.element.type) {
      case ElementTypes.text:
        return (
          <div className = 'usual-post-text action-create-element-post'>
            {this.props.element.text}
          </div>
        );
        break;
      case ElementTypes.image:
        return (
          <div className = 'usual-post-photo action-create-element-post'>
            <img src = {this.props.element.url} />
          </div>
        );
        break;
      case ElementTypes.divider:
        return (
          <div>
            <div className = 'usual-post-devider create-usual-post-divider action-create-element-post'/>
            <div className = 'clearboth' />
          </div>
        );
        break;
      default:
        CE('Undefined PostText type');
    }
  }
})

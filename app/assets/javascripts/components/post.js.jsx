const Post = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    editPost: React.PropTypes.func.isRequired,
    removePost: React.PropTypes.func.isRequired,
    likePost: React.PropTypes.func.isRequired,
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
  likeClick: function(){
    var post_id = this.props.post.id;
    CI('LIKE', post_id);
    if(window.currentUser)
      this.props.likePost(post_id);
  },
  //END*****************************************************ACTIONS
  render: function() {
    return (
      <div className='post card-sp'>
        <PostAuthorView
          author={this.props.post.author}
          time={this.props.post.time}
          can_edit={this.props.post.can_edit}
          can_remove={this.props.post.can_remove}
          removeClick={this.removeClick}
          editClick={this.editClick}/>
        <div className = 'post-content'>
          <PostContentView
            post={this.props.post}/>
          <PostTextView
            text_elements={this.props.post.text_elements}/>
          <PostFooter
            likeClick={this.likeClick}
            likes={this.props.post.likes}
            current_like_just={this.props.post.current_like_just||false}
            current_like={this.props.post.current_like}
            />
        </div>
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
    if (this.props.can_edit)
      var edit_button = <li><a onClick={this.props.editClick}>Редактировать</a></li>;
    if (this.props.can_remove)
      var remove_button = <li><a onClick={this.props.removeClick}>Удалить</a></li>;
    var manage_block = (
      <div className = 'btn-group'>
        <span className = 'sign-dots-menu' data-toggle="dropdown">•••</span>
        <ul className="dropdown-menu" role="menu">
          {edit_button}
          {remove_button}
          <li><a onClick={this.props.removeClick}>Пожаловаться</a></li>
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
              {this.props.author.name} <span className='post-autor-data'>• {this.props.time}</span>
            </div>
            <div className = 'post-autor-type'>
              {this.props.author.type}
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

//Post NESTED COMPONENT############################################
const PostContentView = React.createClass({
  render: function() {
    var main_part;
    switch (this.props.post.type) {
      case PostTypes.text:
        main_part = (
          <div>
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
          <div className='post-type'>
            <a href = {this.props.post.linkdata.url} target='blank'>
              <div className = 'post-type-link extra-background'>
                <header className = 'post-type-link-title'>
                  {this.props.post.linkdata.title}
                </header>
                <div className = 'post-type-link-description'>
                  {this.props.post.linkdata.description}
                </div>
                <div className = 'post-type-link-link'>
                  <span className = 'decor-type-link-link'>{this.props.post.linkdata.domain}</span>
                </div>
              </div>
            </a>
          </div>
        );
        break;
      case PostTypes.file:
        var files = this.props.post.files.map(function (f, index) {
          return (
            <ContentFile
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
        <div>
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
      <div className='usual-post-contant'>
        {rendered_elements}
      </div>
    );
  }
})

const PostFooter = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    likeClick: React.PropTypes.func.isRequired,
    current_like: React.PropTypes.bool.isRequired,
    current_like_just: React.PropTypes.bool.isRequired,
    likes: React.PropTypes.number.isRequired
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
        <div className='post-footer'>
          <span className={classname} onClick={this.props.likeClick}>{likes_count}</span>
        </div>
        <div className='clearboth'>
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

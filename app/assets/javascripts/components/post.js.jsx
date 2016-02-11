const Post = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    editPost: React.PropTypes.func.isRequired,
    likePost: React.PropTypes.func.isRequired,
    removePost: React.PropTypes.func.isRequired,
    removeComment: React.PropTypes.func.isRequired,
    createComment: React.PropTypes.func.isRequired,
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
  basketClick: function(){
    var post_id = this.props.post.id;
    CI('Post::basketClick', post_id);
    if(window.currentUser)
      this.props.addPostToBasket(post_id);
  },
  createComment: function(text){
    CW("Post::createComment", text);
    post_id = this.props.post.id;
    this.props.createComment(post_id, text);
  },
  removeComment: function(id){
    CW("Post::removeComment", id);
    post_id = this.props.post.id;
    this.props.removeComment(post_id, id);
  },
  updateComment: function(id, text){
    CW("Post::updateComment", id);
    post_id = this.props.post.id;
    this.props.updateComment(post_id, id, text);
  },
  //END*****************************************************ACTIONS
  render: function() {
    var tags = this.props.post.tags.map(function(name, i){
      return <a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>
    });
    if (window.currentUser && window.currentUser.admin)
      var post_id = this.props.post.id;
    return (
      <div className='post card-sp'>
        {post_id}
        <PostAuthorView
          author={this.props.post.author}
          city_name={this.props.post.city_name}
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
          <div className='wrap-post-tags-sp'>
            <p className='tags-sp'>{tags}</p>
          </div>
          <PostCommentBox
            likeClick={this.likeClick}
            basketClick={this.basketClick}
            createComment={this.createComment}
            removeComment={this.removeComment}
            updateComment={this.updateComment}
            comments={this.props.post.comments}
            likes={this.props.post.likes}
            baskets_count={this.props.post.baskets_count}
            current_like_just={this.props.post.current_like_just||false}
            current_basket={this.props.post.current_basket}
            current_like={this.props.post.current_like}
            />
        </div>
      </div>
    );
  }
})

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
        var text = sanitizeHtml(this.props.element.text, {allowedTags: ['div', 'br']});
        return (
          <div className = 'usual-post-text action-create-element-post'>
            <div
              className = 'usual-post-text-text'
              dangerouslySetInnerHTML={{__html: text}}/>
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

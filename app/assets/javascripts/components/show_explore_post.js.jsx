var ShowExplorePost = React.createClass({
  removeComment(comment_id){
    this.props.removeComment(this.props.post.id, comment_id);
  },
  likeClick(){
    console.log('do nothing');
  },
  createComment(text){
    this.props.createComment(this.props.post.id, text);
  },
  updateComment(comment_id, text){
    this.props.updateComment(this.props.post.id, comment_id, text);
  },
  render(){
    if (!this.props.post) return null;
    console.log(this.props.post)
    var post = this.props.post;
    var author = post.author;
    var tags = this.props.post.tags.map(function(name, i){
      return <a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>
    });
    var main_content;
    //main_content =
    return (
      <ReactBootstrap.Modal
        dialogClassName='modal-dialog modal-dialog-show-post'
        show={true}
        onHide={this.props.onHide}>
          <div className="modal-header">
            <div className='post-autor'>
              <a href={author.url}>
                <div className="usual-avatar" style={{
                  background: 'url(' + author.avatar + ') no-repeat',
                  backgroundSize:'cover'}}>
                </div>
                <div className='post-autor-info'>
                  <h4 className="modal-title" id="myModalLabel">{author.name}</h4>
                  <div>{post.city_name}, {post.time}</div>
                </div>
              </a>
            </div>
          </div>
          <div className="modal-body">
            <div className='modal-post-content'>
              <PostContentView
                post={post}/>
              <PostTextView
                text_elements={post.text_elements}/>

              <PostCommentBox
                likeClick={this.likeClick}
                basketClick={this.basketClick}
                createComment={this.createComment}
                removeComment={this.removeComment}
                updateComment={this.updateComment}
                comments={this.props.post.comments}
                likes={this.props.post.likes}
                baskets_count={post.baskets_count}
                current_like_just={post.current_like_just||false}
                current_basket={post.current_basket}
                current_like={post.current_like}
              />
            </div>
            <div className='modal-atributes'>
              <div className='likes-and-views'>
                <ul>
                  <li className='likes'>
                    <img src='/images/like_grey.png' /> <span>{post.likes || ''}</span>
                  </li>
                  {/*<li className='views'>
                                      <img src='/images/views.png' /> <span>74563</span>
                                    </li>*/}
                </ul>
              </div>
              <div className='modal-tags'>
                <h4>Теги</h4>
                <p className="tags-sp">
                  {tags}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
          </div>
      </ReactBootstrap.Modal>
    );
  }
})

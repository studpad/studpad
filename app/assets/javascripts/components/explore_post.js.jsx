const ExplorePost = React.createClass({
  onLikeClick(){
    this.props.like_post(this.props.post.id);
  },
  render(){
    post = this.props.post;
    var image, link_rendered;
    switch (this.props.post.type) {
      case PostTypes.link:
        if (post.linkdata.image_url)
          image = <img src={post.linkdata.image_url}/>
        link_rendered = (
          <p className='link'>
            <img src="/images/link.png"/>
            <a href={post.linkdata.url}>{post.linkdata.domain}</a>
          </p>
        );
        break;
      case PostTypes.photo:
        image = <img src={post.photos[0].url}/>
        break;
      case PostTypes.video:
        image = (
          <iframe width='100%' height='100%'
            src={"http://www.youtube.com/embed/" + post.youtube_id}>
          </iframe>
        );
        break;
    }
    var rendered_likes;
    if (post.current_like) {
      rendered_likes = (
        <span onClick={this.onLikeClick}>
          <img
            title='Сохранить себе'
            data-toggle="tooltip"
            data-placement="top"
            src='images/like_active.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    } else {
      rendered_likes = (
        <span onClick={this.onLikeClick}>
          <img
            title='Сохранить себе'
            data-toggle="tooltip"
            data-placement="top"
            src='images/like.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    }
    var text = $.grep(post.text_elements, function(e){return e.type == ElementTypes.text});
    text = text[0].text;
    var text = sanitizeHtml(text, {allowedTags: ['div', 'br']});
    return(
      <figure>
        <div className="autor-explore border-radius-top">
          <div className="avatar" style={{background: 'url('+post.author.avatar+') no-repeat', backgroundSize: 'cover'}}>
          </div>
          <div className="info">
          <div className='name'>
            <a href={post.author.url}>{post.author.name}</a>
          </div>
          <div className='follow'>
            <a href={post.author.url+'/follow'} data-method='post'>Читать</a>
          </div>
          </div>
        </div>
        {image}

        <figcaption className='content-board border-b-radius'>
        {link_rendered}
        <h3 className='title'>{post.linkdata.description}</h3>
        <p className='text' dangerouslySetInnerHTML={{__html: text}}></p>
        <p className='tags-sp'><span>#studpad</span> <span>#йога</span> <span>#друг</span></p>

        <footer>
          <div className='delicious-like'>
            <div>
              <a href={post.url}>
              Просмотреть
              </a>
            </div>
          <div>
          {rendered_likes}
          </div>
          </div>
        </footer>
        <div className='clearboth'>
        </div>
        </figcaption>
      </figure>
    );
  }
});

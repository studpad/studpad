const ExplorePost = React.createClass({
  onLikeClick(){
    this.props.like_post(this.props.post.id);
  },
  onShowClick(){
    //console.log('showClick')
    this.props.showClick(this.props.post.id);
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
            <a
              target='blank'
              href={post.linkdata.url}>
              {post.linkdata.domain}
            </a>
          </p>
        );
        break;
      case PostTypes.photo:
        var photo_count = post.photos.length;
        var images_count = $.grep(post.text_elements, function(e){return e.type == ElementTypes.image});
        images_count = images_count.length;
        var all_images_count;
        if (images_count + photo_count > 1)
          all_images_count = <span className="explore-num-photo">{images_count + photo_count}</span>
        image = (
          <div>
            <img src={post.photos[0] && post.photos[0].url}/>
            {all_images_count}
          </div>
        );
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
            title='Лайк'
            data-toggle="tooltip"
            data-placement="top"
            src='/images/like_active.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    } else {
      rendered_likes = (
        <span onClick={this.onLikeClick}>
          <img
            title='Лайк'
            data-toggle="tooltip"
            data-placement="top"
            src='/images/like_grey.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    }
    var text = $.grep(post.text_elements, function(e){return e.type == ElementTypes.text});
    text = text[0] ? text[0].text : '';
    var text = sanitizeHtml(text, {allowedTags: ['div', 'br']});

    var tags = post.tags.map(function(name, i){return <a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>})
    // if (window.currentUser && post.author.url != window.currentUser.url)
    //   var follower = (
    //     <div className='follow'>
    //       <a href={post.author.url+'/follow'} data-method='post'>Читать</a>
    //     </div>
    //   );
    if (window.currentUser && window.currentUser.admin){
      var admin_block = (
        <CategorySelect
          recommended={post.recommended}
          visible={post.visible}
          url={post.url}
          values={post.categories}/>
      );
      var post_id = this.props.post.id;
    }
    if(post.linkdata.description)
      var title_link = <h3 className='title'>{post.linkdata.description}</h3>
    if(tags.length)
      var tags_rendered = <p className='tags-sp'>{tags}</p>
    if(text)
      var text_rendered = <p className='text' dangerouslySetInnerHTML={{__html: text}}></p>
    return(
      <figure>
        <div className="autor-explore border-radius-top">
          {post_id}
          <div className="avatar" style={{background: 'url('+post.author.avatar+') no-repeat', backgroundSize: 'cover'}}>
          </div>
          <div className="info">
            <div className='name'>
              <a href={post.author.url}>{post.author.name}</a>
            </div>
            <div className='date'>
              <span>{post.time}</span>
            </div>
          </div>
        </div>
        {image}

        <figcaption className='content-board border-b-radius'>
        <div className='main-contain'>
          {link_rendered}
          {title_link}
          {text_rendered}
          {tags_rendered}
        </div>
        {admin_block}
        <footer>
          <div className='delicious-like'>
            <div className='show-post'>
              <a onClick={this.onShowClick}>
              Просмотреть
              </a>
            </div>
            <div className='action-of-post'>
              <div>
                <span>
                  <img
                    title='Комментарий'
                    data-toggle="tooltip"
                    data-placement="top"
                    src='/images/comment3.png' />
                  <span>
                    {post.comments.length || ''}
                  </span>
                </span>
              </div>
              <div>
                {rendered_likes}
              </div>
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

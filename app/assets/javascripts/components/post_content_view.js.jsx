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
                <div className = 'usual-post-text-text'>
                  {this.props.post.text}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case PostTypes.link:
        var image, link_url = this.props.post.linkdata.image_url;
        if (link_url) {
          image = (
            <div className='post-type-link-img'>
              <div className="usual-post-photo action-create-element-post">
                <img src={link_url} />
              </div>
            </div>
          );
        }
        main_part = (
          <div className='post-type'>
            <a href = {this.props.post.linkdata.url} target='blank'>
              <div className = 'post-type-link extra-background'>
                {image}
                <div className='post-type-link-adress'>
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
      case PostTypes.video:
        main_part = (
          <iframe width='100%' height='100%'
            src={"http://www.youtube.com/embed/" + this.props.post.youtube_id}>
          </iframe>
        )
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
      case PostTypes.photo:
        photos = this.props.post.photos;
        photos = photos.map(function (p, index) {
          return (
            <div key={index} className="usual-post-photo action-create-element-post">
              <img src={p.url} />
            </div>
          );
        });
        main_part = (
          <div>
            {photos}
          </div>
        )
        break
      default:
        CE('Undefined PostType', this.props.post.type);
    }
    return main_part;
  }
});

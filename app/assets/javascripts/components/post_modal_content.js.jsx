const PostModalContent = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    onChangeLink: React.PropTypes.func.isRequired,
    addAttachment: React.PropTypes.func.isRequired,
    removeAttachment: React.PropTypes.func.isRequired,
    addImage: React.PropTypes.func.isRequired,
    onChangeTitle: React.PropTypes.func.isRequired,
    addDivider: React.PropTypes.func.isRequired,
    addPhoto: React.PropTypes.func.isRequired,
    removePhoto: React.PropTypes.func.isRequired,
    changeElementText: React.PropTypes.func.isRequired,
    removeTextElement: React.PropTypes.func.isRequired,
    post: React.PropTypes.shape({
      text_elements: React.PropTypes.array.isRequired,
      files: React.PropTypes.array.isRequired,
      type: React.PropTypes.string.isRequired
    })
  },
  //END*****************************************************DECLARE
  onDrop: function (files) {
    var data = new FormData();
    data.append('file', files[0]);
    $.ajax({
      url: '/attachments',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data) {
        this.props.addAttachment(data)
      }.bind(this),
      error: function (data) {
        CE("PostModalContent::onDrop Can't create attachment", data);
      }
    });
  },
  chooseLinkImage(src){
    this.props.chooseLinkImage(src);
  },
  componentDidMount: function() {
    if (this.props.post.type == PostTypes.quotation || this.props.post.type == PostTypes.text) {
      var node = this.refs.title.getDOMNode();
      $(node).autoResize({
        limit:600,
        extraSpace:0,
        animate:true
      });
      $(node).change();
      $(node).focus();
    }
  },
  render: function() {
    var main_part;
    files = this.props.post.files.map(function (f, index) {
      return (
        <ModalContentFile
          remove={this.props.removeAttachment}
          key={index}
          attachment_id={f.id}
          name={f.name}
          url={f.url} />
      );
    }.bind(this));
    switch (this.props.post.type) {
      case PostTypes.text:
        main_part = (
          <div className='form-new-post usual-post-contant'>
            <div className='form-wrap-new-post-type'>
              <input
                ref='title'
                type='text'
                value={this.props.post.title}
                onChange={this.props.onChangeTitle}
                className='input-new-post form-text-title input-sp form-control'
                placeholder = 'Введите здесь заголовок'/>
            </div>
          </div>
        );
        break;
      case PostTypes.photo:
        main_part = (
          <PhotosBox
            setFocus={this.props.setFocus}
            addPhoto={this.props.addPhoto}
            removePhoto={this.props.removePhoto}
            photos={this.props.post.photos}/>
        );
        break;
      case PostTypes.link:
        if (this.props.post.linkdata.loadedimages){
          var self = this;
          var images = this.props.post.linkdata.loadedimages.map(function(src, i){
            return (
              <div
                key={i}
                onClick={self.chooseLinkImage.bind(self, src)}
                style={{
                  background: 'url('+src+') no-repeat',
                  backgroundSize: 'cover'
                }}>
              </div>
            );
          });
        }
        var link_images, loaded_image;
        if (this.props.post.linkdata.image_url) {
          loaded_image = (
            <div className="usual-post-photo action-create-element-post">
              <img src={this.props.post.linkdata.image_url} />
            </div>
          );
        } else  {
          if(images && images.length){
            link_images = ([
                (<div className='choose-img'>{images}</div>),
                (<div className='clearboth'></div>)
              ]
            )
          }
        }
        var link_title, link_domain, link_description;
        if (this.props.post.linkdata.title) {
          link_title = (
            <header className = 'post-type-link-title'>
              {this.props.post.linkdata.title}
            </header>)
        }
        if (this.props.post.linkdata.description) {
          link_description = (
            <div className = 'post-type-link-description'>
              {this.props.post.linkdata.description}
            </div>)
        }
        if (this.props.post.linkdata.domain) {
          link_domain = (
            <div className = 'post-type-link-link'>
              <span className = 'decor-type-link-link'>{this.props.post.linkdata.domain}</span>
            </div>)
        }

        main_part = (
          <div className = 'form-new-post'>
            <div className = 'form-wrap-new-post-type'>
              <div className = 'extra-background'>
                <input
                  ref='title'
                  type = 'text'
                  onChange={this.props.onChangeLink}
                  className = 'input-new-post form-link input-sp form-control'
                  placeholder = 'Введите здесь адрес интернет-ресурса'/>
              </div>
            </div>
            <div className = 'post-type'>
                <a hrefName = ''><div className = 'post-type-link extra-background'>
                  <div className='post-type-link-img'>
                    {link_images}
                    {loaded_image}
                  </div>
                  <div className='post-type-link-adress'>
                    {link_title}
                    {link_description}
                    {link_domain}
                  </div>
                </div></a>
            </div>
          </div>
        );
        break;
      case PostTypes.file:
        main_part = (
        <div className='row'>
          <div className = 'form-new-post'>
            <div className = 'form-wrap-new-post-type'>
              <DropzoneComponent
                onDrop={this.onDrop}>
                <div style={{'padding-top': 3}}>
                Кликните или перетащите файлы сюда.
                </div>
              </DropzoneComponent>
            </div>
            {files}
          </div>
        </div>
        );
        break;
      case PostTypes.video:
        main_part = (
          <VideoBox
            changeVideo={this.props.changeVideo}
            youtube_id={this.props.post.youtube_id}/>
        );
        break;
      case PostTypes.quotation:
        main_part = (
          <div className='form-new-post usual-post-contant'>
            <div className='form-wrap-new-post-type'>
              <textarea
                value={this.props.post.title}
                onChange={this.props.onChangeTitle}
                ref='title'
                className=
                'textarea-new-post textarea-sp post-type-cite form-control form-cite'
                placeholder = 'Здесь введите текст цитаты'>
              </textarea>
            </div>
          </div>
        );
        break;
      default:
        CE("Undefined type");
    }
    return (
      <div className = "modal-body my-setting-modal-body">
        <div className = 'container-fluid'>
          {main_part}
          <PostText
            ref='post_text'
            showTips={this.props.showTips}
            removeTextElement={this.props.removeTextElement}
            addImage={this.props.addImage}
            changeElementText={this.props.changeElementText}
            addDivider={this.props.addDivider}
            text_elements={this.props.post.text_elements}
            typePost={this.props.post.type}/>
          <TagSelect
            setTags={this.props.setTags}
            values={this.props.post.tags}/>
        </div>
      </div>
    );
  }
})

//PostModalContent NESTED COMPONENT############################
const ModalContentFile = React.createClass({
  onRemoveClick: function() {
    var id = this.props.attachment_id;
    CI('ModalContentFile::onRemoveClick', id);
    this.props.remove(id);
  },
  render: function() {
    var remove_button_file = <img onClick={this.onRemoveClick} className='remove-angle  file-remove-angle' src = '/images/close.png' />
    return (
      <div className = 'post-type-material-all-wrap'>
        {remove_button_file}
        <div className = 'post-type-material-item'>
          <div className = 'post-type-material-icon'>
          </div>
          <div className = 'post-type-material-text'>
            <a href={this.props.url} target='blank'>
              {this.props.name}
            </a>
          </div>
        </div>
        <div className = 'clearboth'>
        </div>
      </div>
    );
  }
});

const ContentFile = React.createClass({
  render: function() {
    return (
      <div className = 'post-type-material-all-wrap'>
        <div className = 'post-type-material-item'>
          <div className = 'post-type-material-icon'>
          </div>
          <div className = 'post-type-material-text'>
            <a href={this.props.url} target='blank'>
              {this.props.name}
            </a>
          </div>
        </div>
        <div className = 'clearboth'>
        </div>
      </div>
    );
  }
});

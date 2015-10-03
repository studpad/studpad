const PostModalContent = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    onChangeLink: React.PropTypes.func.isRequired,
    addAttachment: React.PropTypes.func.isRequired,
    removeAttachment: React.PropTypes.func.isRequired,
    addImage: React.PropTypes.func.isRequired,
    onChangeTitle: React.PropTypes.func.isRequired,
    addDivider: React.PropTypes.func.isRequired,
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
              placeholder = 'Заголовок'/>
          </div>
        </div>
        );
        break;
      case PostTypes.link:
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
                placeholder = 'Введи URL-адрес'/>
            </div>
          </div>
          <div className = 'post-type'>
              <a hrefName = ''><div className = 'post-type-link post-type-link-create extra-background'>
                {link_title}
                {link_description}
                {link_domain}
              </div></a>
          </div>
        </div>
        );
        break;
      case PostTypes.file:
        main_part = (
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
        );
        break;
      case PostTypes.quotation:
        main_part = (
        <div className='form-new-post'>
          <div className='form-wrap-new-post-type'>
            <textarea
              value={this.props.post.title}
              onChange={this.props.onChangeTitle}
              className=
              'textarea-new-post textarea-sp post-type-cite form-control form-cite'
              placeholder = 'Цитата'>
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
          <div className = 'row'>
            {main_part}
          </div>
          <PostText
            ref='post_text'
            removeTextElement={this.props.removeTextElement}
            addImage={this.props.addImage}
            changeElementText={this.props.changeElementText}
            addDivider={this.props.addDivider}
            text_elements={this.props.post.text_elements}
            typePost={this.props.post.type}/>
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
    var remove_button_file = <button onClick={this.onRemoveClick} className='remove-angle  file-remove-angle'>&times;</button>
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
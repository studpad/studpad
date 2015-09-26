const PostModalContent = React.createClass({
  getInitialState: function () {
    return {
      link_description: {},
      files: []
    };
  },
  onChangeLink: function(event) {
    url = event.target.value
    console.log(url);
    $.ajax({
      url: '/ajax/page_description',
      dataType: 'JSON',
      data: {url: url},
      cache: false,
      success: function(data) {
        if (data) {
          this.setState({
            link_description: data
          })
        } else {
          this.setState({link_description: {}})
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Can't resolve host", status);
      }
    });
  },
  getFormData: function() {
    postData = {};
    postData.title = this.refs.title.getDOMNode().value.trim();
    //postData.text = this.refs.text.getDOMNode().value.trim();
    postData.type = this.props.type;
    postData.linkdata = this.state.link_description;
    postData.attachment_ids = this.state.files.map(function(f){return f.id});
    postData.text_elements = this.refs.post_text.getData();
    console.log(postData);
    return postData;
  },
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
        files = this.state.files;
        files.push({
          id: data.id,
          name: data.name,
          url: data.link
        });
        this.setState({files: files});
        console.info('Attachemnt', data);
      }.bind(this),
      error: function (data) {
        console.error("Can't attach file", data);
      }
    });
    console.log('Received files: ', files[0]);
  },
  render: function() {
    var main_part;
    files = this.state.files.map(function (f, index) {
      return (
        <ModalContentFile
          key={index}
          name={f.name}
          url={f.url} />
      );
    });
    switch (this.props.type) {
      case PostTypes.text:
        main_part = (
        <div className='form-new-post usual-post-contant'>
          <div className='form-wrap-new-post-type'>
            <input
              ref='title'
              type='text'
              className='input-new-post form-text-title input-sp form-control'
              placeholder = 'Заголовок'/>
          </div>
        </div>
        );
        break;
      case PostTypes.link:
        var link_title, link_domain, link_description;
        if (this.state.link_description.title) {
          link_title = (
            <header className = 'post-type-link-title'>
              {this.state.link_description.title}
            </header>)
        }
        if (this.state.link_description.description) {
          link_description = (
            <div className = 'post-type-link-description'>
              {this.state.link_description.description}
            </div>)
        }
        if (this.state.link_description.domain) {
          link_domain = (
            <div className = 'post-type-link-link'>
              <span className = 'decor-type-link-link'>{this.state.link_description.domain}</span>
            </div>)
        }

        main_part = (
        <div className = 'form-new-post'>
          <div className = 'form-wrap-new-post-type'>
            <div className = 'extra-background'>
              <input
                ref='title'
                type = 'text'
                onChange={this.onChangeLink}
                className = 'input-new-post form-link input-sp form-control'
                placeholder = 'Введи URL-адрес'/>
            </div>
          </div>
          <div className = 'post-type'>
              <a hrefName = ''><div className = 'post-type-link extra-background'>
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
              <div style={{height: 200}}>
              Кликните или перетащите файлы сюда.
              </div>
            </DropzoneComponent>
          </div>
          <input
              ref='title'
              type='text'
              className='input-new-post form-text-title input-sp form-control'
              placeholder = 'Заголовок'/>
          {files}
        </div>
        );
        break;
      case PostTypes.quotation:
        main_part = (
        <div className='form-new-post'>
          <div className='form-wrap-new-post-type'>
            <textarea
              ref='title'
              className=
              'textarea-new-post textarea-sp post-type-cite form-control form-cite'
              placeholder = 'Цитата'>
            </textarea>
          </div>
        </div>
        );
        break;
      default:
        console.log("Undefined type");
    }
    return (
    <div className = "modal-body my-setting-modal-body">
      <div className = 'container-fluid'>
        <div className = 'row'>
          {main_part}
        </div>
        <PostText ref='post_text' typePost={this.props.type}/>
      </div>
    </div>
    );
  }
})

const ModalContentFile = React.createClass({
  render: function() {
    return (
      <div>
        <div className = 'post-type-material-item'>
          <div className = 'post-type-material-icon'>
          </div>
          <div className = 'post-type-material-text'>
            <a href={this.props.url}>{this.props.name}</a>
          </div>
        </div>
        <div className = 'clearboth'>
        </div>
      </div>
    );
  }
});

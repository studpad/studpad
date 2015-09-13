const PostModalContent = React.createClass({
  getFormData: function() {
    postData = {};
    postData.title = this.refs.title.getDOMNode().value.trim();
    postData.text = this.refs.text.getDOMNode().value.trim();
    postData.post_type = this.props.type;
    console.log(postData);
    return postData;
  },
  render: function() {
    var main_part;
    switch (this.props.type) {
      case PostTypes.text:
        main_part = (
        <div className='form-new-post'>
          <div className='form-wrap-new-post-type'>
            <input
              ref='title'
              type='text'
              className='input-new-post form-text-title input-sp form-control'
              placeholder = 'Заголовок'/>
          </div>
          <div className='form-wrap-usual-text'>
            <textarea
              ref='text'
              className='textarea-new-post textarea-sp form-control'
              placeholder = 'Введите текст'>
            </textarea>
          </div>
        </div>
        );
        break;
      case PostTypes.link:
        main_part = (
        <div className = 'form-new-post'>
          <div className = 'form-wrap-new-post-type'>
            <div className = 'extra-background'>
              <input
                ref='title'
                type = 'text'
                className = 'input-new-post form-link input-sp form-control'
                placeholder = 'Введи URL-адрес'/>
            </div>
          </div>
          <div className = 'form-wrap-usual-text'>
              <textarea
                ref='text'
                className = 'textarea-new-post textarea-sp form-control'
                placeholder = 'Если хотите, добавьте описание.'>
              </textarea>
          </div>
        </div>
        );
        break;
      case PostTypes.file:
        main_part = (
        <div className = 'form-new-post'>
          <div className = 'form-wrap-new-post-type'>
            <div className = 'drop-zone'>
              Для загрузки файлов, кликните или перетащите их сюда.
            </div>
          </div>
          <div className = 'form-wrap-usual-text'>
            <textarea
              ref='text'
              className = 'textarea-new-post textarea-sp form-control'
              placeholder = 'Если хотите, добавьте описание.'>
            </textarea>
          </div>
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
          <div className='form-wrap-usual-text'>
              <textarea
                ref='text'
                className='textarea-new-post textarea-sp form-control'
                placeholder = '- Источник'>
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
      </div>
    </div>
    );
  }
})

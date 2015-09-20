const PostTypes = {text: 'text', file: 'filegroup', link: 'link', quotation: 'quotation'}

const PostModalForm = React.createClass({
  propTypes: {
    hideModalForm: React.PropTypes.func.isRequired,
    createPost: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool.isRequired
  },
  getDefaultProps: function() {
    return {type: PostTypes.text};
  },
  submitForm: function () {
    var postData = this.refs.formContent.getFormData();
    console.info('Submit post form with', postData);
    this.props.createPost(postData);
    this.props.hideModalForm();
  },
  render: function() {
    return (
    <ReactBootstrap.Modal
      dialogClassName='modal-dialog-new-post my-setting-modal-dialog'
      onHide={this.props.hideModalForm}
      show={this.props.show}>
      <div className="modal-content modal-content-new-post my-setting-modal-content">
        <PostModalAuthor />
        <PostModalContent ref='formContent' type={this.props.type}/>
        <PostModalFooter
          close={this.props.hideModalForm}
          submit={this.submitForm} />
      </div>
    </ReactBootstrap.Modal>
    );
  }
});

const PostModalFooter = React.createClass({
  render: function(){
    return (
    <ReactBootstrap.Modal.Footer>
      <button
        onClick={this.props.close}
        type="button"
        className="btn btn-default btn-st-inert">
        Закрыть
      </button>
      <button
        onClick={this.props.submit}
        type="button"
        className="btn btn-primary btn-st"
        data-loading-text = "Подождите...">
        Опубликовать
      </button>
    </ReactBootstrap.Modal.Footer>
    );
  }
})

const PostModalAuthor = React.createClass({
  render: function(){
    return (
      <div className = 'post-autor'>
        <div className="usual-avatar" style={{
          background: 'url('+ window.currentUser.avatar +') no-repeat',
          'backgroundSize': 'cover'}}>
        </div>
        <div className = 'post-autor-info'>
          <div className = 'post-autor-name'>
            {window.currentUser.name}
          </div>
          <div className = 'post-autor-type'>
            Преподаватель
          </div>
        </div>
      </div>
    );
  }
})

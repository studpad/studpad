var CommentForm = React.createClass({
  sendComment: function () {
    var textarea = React.findDOMNode(this.refs.text);
    var text = textarea.value.trim()
    if (!text) {
      return;
    }
    textarea.value = '';
    this.props.sendComment(text);
  },
  render: function () {
    if (this.props.visible){
      return (
        <div>
          <textarea ref="text" className='form-control textHW_comment my-setting-form-control'
            placeholder="Введите комментарий и нажмите Enter" />
          <button className="btn btn-primary btn-xs btn-st" onClick={this.sendComment}>
            Отправить
          </button>
        </div>
      )
    } else {
      return <div/>;
    }
  }
});

var NewsForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.props.onNewsSubmit(text);
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return (
      <form className="new_news_item" id="new_news_item" onSubmit={this.handleSubmit}>
        <textarea className="form-control" ref='text' id="textHW" placeholder="Ваша новость..." name="news_item[text]" >
        </textarea>
        <div className='wrap-send-news'>
          <input type="submit" id='send-news' className="btn btn-primary btn-st" value="Опубликовать"/>
        </div>
      </form>
    );
  }
});

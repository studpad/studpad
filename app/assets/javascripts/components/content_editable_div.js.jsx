var ContentEditableDiv = React.createClass({
  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },
  componentDidMount: function() {
    var node = this.refs.textdiv.getDOMNode();
    if (this.props.focus)
      $(node).focus();
  },
  emitChange: function(){
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  },
  render: function(){
    return <div
      ref='textdiv'
      placeholder={this.props.placeholder}
      onInput={this.emitChange}
      onBlur={this.emitChange}
      className={this.props.cssClass}
      contentEditable
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  }
});

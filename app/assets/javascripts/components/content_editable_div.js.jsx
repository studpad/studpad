var ContentEditableDiv = React.createClass({
  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },
  componentDidMount: function() {
    // var node = this.refs.textdiv.getDOMNode();
    // if (this.props.focus)
    //   $(node).focus();
  },
  componentDidUpdate: function() {
    // CI('contentEditable div updated', this.props.focus);
    // var node = this.refs.textdiv.getDOMNode();
    // if (this.props.focus)
    //   $(node).focus();
  },
  emitChange: function(){
    //CI("hheee", this.refs.textdiv)
    if(this.refs.textdiv)
      var html = this.refs.textdiv.innerHTML;
    // CW('ceditbale ',html);
    // html = sanitizeHtml(html);
    // CW('ceditbale ',html);
    // html = html.replace(new RegExp('<br>', 'g'), "\n");
    // html = html.replace(new RegExp('<div>', 'g'), "");
    // html = html.replace(new RegExp('<div/>', 'g'), "");
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  },
  //
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

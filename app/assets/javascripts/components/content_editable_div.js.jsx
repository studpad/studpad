var ContentEditableDiv = React.createClass({
  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },
  componentDidMount: function() {
    var node = this.refs.textdiv.getDOMNode();
    // $(node).live('keyup', function() {
    //   $(this).children('div').each(function(index) {
    //     $(this).attr('id', 'element-'+index);
    //   });
    // });
    if (this.props.focus)
      $(node).focus();
  },
  emitChange: function(){
    var html = this.refs.textdiv.getDOMNode().innerHTML;
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

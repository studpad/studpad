const PostTextElement = React.createClass({
  onClickText: function() {
    this.props.addElement('',ElementTypes.text)
  },
  onClickImage: function() {
    this.props.addElement('studpad',ElementTypes.image)
  },
  onClickDivider: function() {
    this.props.addElement('studpad',ElementTypes.divider)
  },
  render: function() {
    return (
      <div className='post-add-text-element'>
          <div className='post-add-text-element-label' onClick={this.onClickImage}>
              <span className='add-element-label-photo'></span>
          </div>
          <div className='post-add-text-element-label' onClick={this.onClickDivider}>
              <span className='add-element-label-divider'></span>
          </div> 
      </div>
    );
  }
});

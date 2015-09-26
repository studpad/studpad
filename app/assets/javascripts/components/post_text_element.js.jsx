const PostTextElement = React.createClass({
  onClickText: function() {
    this.props.addElement('',ElementTypes.text)
  },
  onClickImage: function() {
    this.refs.drop.onClick();
    //this.props.addElement('studpad',ElementTypes.image)
  },
  onClickDivider: function() {
    this.props.addDevider();
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
        this.props.addImage(data)
        console.info('Add impage as post text', data);
      }.bind(this),
      error: function (data) {
        console.error("Can't add image to post text", data);
      }
    });
  },
  render: function() {
    return (
      <div className='post-add-text-element'>
        <DropzonePure ref='drop' onDrop={this.onDrop}/>
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

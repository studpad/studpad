const PostTextManagmentPanel = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    addImage: React.PropTypes.func.isRequired,
    addDivider: React.PropTypes.func.isRequired
  },
  //END*****************************************************DECLARE
  onClickImage: function() {
    CI('PostTextManagmentPanel::onClickImage');
    this.refs.drop.onClick();
  },
  onClickDivider: function() {
    CI('PostTextManagmentPanel::onClickDivider');
    this.props.addDivider();
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
        this.props.addImage(data);
      }.bind(this),
      error: function (data) {
        CE("Can't add image to post text", data);
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

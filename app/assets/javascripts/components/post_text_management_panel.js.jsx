const PostTextManagmentPanel = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    addImage: React.PropTypes.func.isRequired,
    addDivider: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
      return {
          visibility_tips: true  
      };
  },
  //END*****************************************************DECLARE
  onClickImage: function() {
    CI('PostTextManagmentPanel::onClickImage');
    this.refs.drop.onClick();
    this.hideTips();
  },
  onClickDivider: function() {
    CI('PostTextManagmentPanel::onClickDivider');
    this.props.addDivider();
    this.hideTips();
  },
  hideTips: function() {
    this.setState({visibility_tips: false})
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
    if(this.state.visibility_tips){
      var tips = (<div className='tipt-post-add-element'>
          <div className='glossary-post-element glossary-post-element-photo'>
            Картинка или фотография украсят публикацию и сделают её заметнее.
          </div>
          <div className='glossary-post-element glossary-post-element-devider'>
            Горизонтальная черта поможет Вам разделить главные мысли.
          </div>
        </div>)
    }
    return (
      <div>
        <div className='post-add-text-element'>
          <DropzonePure ref='drop' onDrop={this.onDrop}/>
          <div className='post-add-text-element-label' onClick={this.onClickImage}>
            <span className='add-element-label-photo hide-tipt-post-add-element'></span>
          </div>
          <div className='post-add-text-element-label' onClick={this.onClickDivider}>
            <span className='add-element-label-divider hide-tipt-post-add-element'></span>
          </div>
        </div>
        {tips}
      </div>
    );
  }
});

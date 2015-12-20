const PostTextManagmentPanel = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    showTips: React.PropTypes.bool,
    addImage: React.PropTypes.func.isRequired,
    addDivider: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      visibility_tips: this.props.showTips
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
        </div>)
    }
    return (
      <div>
        <div>
          <div className='post-add-text-element'>
            <DropzonePure ref='drop' onDrop={this.onDrop}/>
            <div className='post-add-text-element-label' onClick={this.onClickImage}>
              <span className='add-element-label-photo hide-tipt-post-add-element'></span>
            </div>
          </div>
          {tips}
        </div>
        <div>
          <div className='attached-files'>
            <div className="post-type-material-item">
              <div className="post-type-material-icon">
              </div>
              <div className="post-type-material-text">
                <a href="/uploads/attachment/file/3928/10242690801923124.pdf" target="blank">10242690801923124...</a>
              </div>
            </div>
            <div className="post-type-material-item">
              <div className="post-type-material-icon">
              </div>
              <div className="post-type-material-text">
                <a href="/uploads/attachment/file/3928/10242690801923124.pdf" target="blank">Красивая принцесса</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

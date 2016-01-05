const PostManagementPanel = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    newPost: React.PropTypes.func
  },
  //END*****************************************************DECLARE
  //BEGIN***************************************************ACTIONS
  /*onClickText: function() {
    this.props.newPost(PostTypes.text);
    CI('PostManagementPanel::onClickText');
  },*/
  onClickPhoto: function() {
    this.props.newPost(PostTypes.photo);
    CI('PostManagementPanel::onClickPhoto');
  },
  onClickLink: function() {
    this.props.newPost(PostTypes.link);
    CI('PostManagementPanel::onClickLink');
  },
  /*onClickFile: function() {
    this.props.newPost(PostTypes.file);
    CI('PostManagementPanel::onClickFile');
  },*/
  /*onClickQuotation: function() {
    this.props.newPost(PostTypes.quotation);
    CI('PostManagementPanel::onClickQuotation');
  },*/
  onClickVideo: function() {
    this.props.newPost(PostTypes.video);
    CI('PostManagementPanel::onClickVideo');
  },
  //END*****************************************************ACTIONS
  //BEGIN***************************************************HELPERS
  //END*****************************************************HELPERS
  render: function() {
    return (
      <div className='new-post-buttons card-sp'>
        <div className='new-post-wrap'>
          <div className='new-post-label' onClick={this.onClickPhoto}>
            <div className='icon-post-photo icon-post'>
              <img src = '/images/photo.png'/>
            </div>
            <span className='new-post-label-name'>Фото</span>
          </div>
          <div className='new-post-label' onClick={this.onClickVideo}>
            <div className='icon-post-cite icon-post'>
              <img src = '/images/video.png' />
            </div>
            <span className='new-post-label-name'>Видео</span>
          </div>
          <div className='new-post-label' onClick={this.onClickLink}>
            <div className='icon-post-link icon-post'>
              <img src = '/images/link.png' />
            </div>
            <span className='new-post-label-name'>Ссылка</span>
          </div>
        </div>
        <div className='clearboth'>
        </div>
      </div>
    );
  }
})
const PostManagementPanel = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    newPost: React.PropTypes.func
  },
  //END*****************************************************DECLARE
  //BEGIN***************************************************ACTIONS
  onClickText: function() {
    this.props.newPost(PostTypes.text);
    CI('PostManagementPanel::onClickText');
  },
  onClickLink: function() {
    this.props.newPost(PostTypes.link);
    CI('PostManagementPanel::onClickLink');
  },
  onClickFile: function() {
    this.props.newPost(PostTypes.file);
    CI('PostManagementPanel::onClickFile');
  },
  onClickQuotation: function() {
    this.props.newPost(PostTypes.quotation);
    CI('PostManagementPanel::onClickQuotation');
  },
  //END*****************************************************ACTIONS
  //BEGIN***************************************************HELPERS
  //END*****************************************************HELPERS
  render: function() {
    return (
      <div className='new-post-buttons card-sp'>
        <div className='new-post-wrap'>
          <div className='new-post-label' onClick={this.onClickText}>
            <div className='icon-post-text icon-post'>
              <img src = '/images/text.png'/>
            </div>
            <span className='new-post-label-name'>Текст</span>
          </div>
          <div className='new-post-label' onClick={this.onClickFile}>
            <div className='icon-post-material icon-post'>
              <img src = '/images/attache.png' />
            </div>
            <span className='new-post-label-name'>Файл</span>
          </div>
          <div className='new-post-label' onClick={this.onClickLink}>
            <div className='icon-post-link icon-post'>
              <img src = '/images/link.png' />
            </div>
            <span className='new-post-label-name'>Ссылка</span>
          </div>
          <div className='new-post-label' onClick={this.onClickQuotation}>
            <div className='icon-post-cite icon-post'>
              <img src = '/images/quote.png' />
            </div>
            <span className='new-post-label-name'>Цитата</span>
          </div>
        </div>
        <div className='clearboth'>
        </div>
      </div>
    );
  }
})

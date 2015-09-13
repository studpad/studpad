const PostManagementPanel = React.createClass({
  onClickText: function() {
    this.props.initModalForm(PostTypes.text)
  },
  onClickLink: function() {
    this.props.initModalForm(PostTypes.link)
  },
  onClickFile: function() {
    this.props.initModalForm(PostTypes.file)
  },
  onClickQuotation: function() {
    this.props.initModalForm(PostTypes.quotation)
  },
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
});

var PostManagementPanel = React.createClass({
  render: function() {
    return (
      <div className='new-post-buttons card-sp'>
        <div className='new-post-wrap'>
          <div className='new-post-label' id = 'new-post-label-text'>
            <div className='icon-post-text icon-post' data-toggle="modal" data-target="#modal_new_post_text"><img src = '/images/text.png'/></div>
            <span className='new-post-label-name'>Текст</span>
          </div>
          <div className='new-post-label' id = 'new-post-label-material'>
            <div className='icon-post-material icon-post' data-toggle="modal" data-target="#modal_new_post_material"><img src = '/images/attache.png' /></div>
            <span className='new-post-label-name'>Файл</span>
          </div>
          <div className='new-post-label' id = 'new-post-label-link'>
            <div className='icon-post-link icon-post' data-toggle="modal" data-target="#modal_new_post_link"><img src = '/images/link.png' /></div>
            <span className='new-post-label-name'>Ссылка</span>
          </div>
          <div className='new-post-label' id = 'new-post-label-cite'>
            <div className='icon-post-cite icon-post' data-toggle="modal" data-target="#modal_new_post_cite"><img src = '/images/quote.png' /></div>
            <span className='new-post-label-name'>Цитата</span>
          </div>
        </div>
        <div className='clearboth'>
        </div>
      </div>
    );
  }
});

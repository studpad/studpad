var PhotosBox = React.createClass({
  addFromComputerClick: function(){
    CI('PhotosBox::addFromComputerClick');
    this.refs.drop.onClick();
  },
  addFromInternetClick: function(){
    CI('PhotosBox::addFromInternetClick');
  },
  onDrop: function(files){
    var data = new FormData();
    data.append('file', files[0]);
    $.ajax({
      url: '/photos',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data) {
        CI('PhotosBox::Uploaded', data);
        //this.props.addAttachment(data)
      }.bind(this),
      error: function (data) {
        CE("PostModalContent::onDrop Can't create attachment", data);
      }
    });
  },
  render: function(){
    return (
      <div>
        <div className='row'>
          <div className='form-new-post usual-post-contant'>
            <DropzonePure ref='drop' onDrop={this.onDrop}/>
            <div className='form-wrap-new-post-type'>
              <div className='split-cells-choose-photo'>
                <div
                  className='split-cell'
                  onClick={this.addFromComputerClick}>
                  <img src = '/images/add_photo_from_device.png' />
                  <br/>
                  Загрузить фото с компьютера
                </div>
                <div
                  className='split-cell'
                  onClick={this.addFromInternetClick}>
                  <img src = '/images/add_photo_from_internet.png' />
                  <br/>
                  Добавить фото из Интернета
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="usual-post-photo action-create-element-post">
          <img className='remove-angle photo-remove-angle' src = '/images/close.png' />
          <img src="http://cs628329.vk.me/v628329048/174ce/cwJ9rDGR9aw.jpg" />
        </div>
      </div>
    );
  }
});

var PhotosBox = React.createClass({
  addFromComputerClick: function(){
    CI('PhotosBox::addFromComputerClick');
    this.setState({show_input: false});
    this.refs.drop.onClick();
  },
  addFromInternetClick: function(){
    this.setState({show_input: true});
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
        this.props.addPhoto(data);
        CI('PhotosBox::Uploaded', data);
      }.bind(this),
      error: function (data) {
        CE("PostModalContent::onDrop Can't create attachment", data);
      }
    });
  },
  getInitialState: function(){
    return {
      show_input: false
    };
  },
  hideInput: function(){
    CI('PhotosBox::hideInput');
    this.setState({show_input: false});
  },
  onChange: function(e){
    CI(e.target.value);
    e_url = e.target.value.trim();
    if (e_url.endsWith('.jpg')  ||
        e_url.endsWith('.jpeg') ||
        e_url.endsWith('.png')  ||
        e_url.endsWith('.gif')) {

      $.ajax({
        url: '/photos',
        type: 'POST',
        data: {link: e_url},
        dataType: 'json',
        success: function(data) {
          this.props.addPhoto(data);
          this.setState({show_input: false});
          CI('PhotosBox::Uploaded', data);
        }.bind(this),
        error: function (data) {
          CE("PostModalContent::onDrop Can't create attachment", data);
        }
      });

    }
  },
  render: function(){
    photos = this.props.photos;
    photos = photos.map(function (p, index) {
      return (
        <div key={index} className="usual-post-photo action-create-element-post">
          <img
            onClick={this.props.removePhoto.bind(this, p.id)}
            className='remove-angle photo-remove-angle'
            src = '/images/close.png' />
          <img src={p.url} />
        </div>
      );
    }.bind(this));

    if (photos.length > 0 && !this.state.show_input){
      var bottom_button_group = (
        <div>
          <div className='add-photo-yet'>
            <div
              className='add-photo-device-yet'
              onClick={this.addFromComputerClick}>
              <img
                className='type-of-add-photo'
                src = '/images/add_photo_from_device.png' /> Добавить с компьютера
            </div>
            <div
              className='add-photo-link-yet'
              onClick={this.addFromInternetClick}>
              <img
                className='type-of-add-photo'
                src = '/images/add_photo_from_internet.png' /> Добавить из Интернета
            </div>
          </div>
          <div className='clearboth'>
          </div>
        </div>

      );
    }
    if (photos.length == 0 && !this.state.show_input) {
      var top_button_group = (
        <div className='row'>
          <div className='form-new-post usual-post-contant'>
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
      );
    }

    if (this.state.show_input) {
      var url_input = (
        <div className='wrap-write-link-to-photo'>
          <img
            onClick={this.hideInput}
            className='remove-angle write-link-to-photo-remove-angle-slim'
            src = '/images/close.png' />
          <div className='write-link-to-photo-slim'>
            <input className='input-new-post form-link input-sp form-control' placeholder='Вставьте URL-адрес' onChange={this.onChange}/>
          </div>
        </div>
      );
    }

    return (
      <div>
        <DropzonePure ref='drop' onDrop={this.onDrop}/>
        {top_button_group}
        {photos}
        {url_input}
        {bottom_button_group}
      </div>
    );
  }
});

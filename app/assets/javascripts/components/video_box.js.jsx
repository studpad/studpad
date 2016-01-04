var VideoBox = React.createClass({
  onChange: function(e){
    url = e.target.value;
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(videoid != null) {
      CI('Video', videoid[1]);
      this.props.changeVideo(videoid[1]);
      this.setState({show_input: false});
    }
  },
  getInitialState: function() {
    return {
      show_input: !this.props.youtube_id
    };
  },
  componentDidMount: function() {
    var ref = this.refs.input;
    if (ref){
      $(ref).focus();
    }
  },
  handleClick: function(){
    this.setState({show_input: true});
    this.props.changeVideo('');
  },
  render: function(){
    var main_part;
    if (this.state.show_input){
      main_part = (
        <div className = 'write-link-to-photo'>
          <input
            ref='input'
            className='input-new-post form-link input-sp form-control'
            onChange={this.onChange}
            placeholder = 'Введите URL-адрес видео из YouTube'/>
        </div>
      );
    } else {
      main_part = (
        <div>
          <img
            onClick={this.handleClick}
            className='remove-angle video-remove-angle'
            src = '/images/close.png' />
          <iframe width='100%' height='100%'
            src={"http://www.youtube.com/embed/" + this.props.youtube_id}>
          </iframe>
        </div>
      );
    }
    return (
      <div>
        {main_part}
      </div>
    )
  }
});

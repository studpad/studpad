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
      show_input: true
    };
  },
  render: function(){
    var main_part;
    if (this.state.show_input){
      main_part = (
        <input onChange={this.onChange}/>
      );
    } else {
      main_part = (
        <iframe width='100%' height='100%'
          src={"http://www.youtube.com/embed/" + this.props.youtube_id}>
        </iframe>
      );
    }
    return (
      <div>
        {main_part}
      </div>
    )
  }
});

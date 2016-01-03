var Masonry = require('react-masonry-component')(React);

var masonryOptions = {
  transitionDuration: 0
};
var Gallery = React.createClass({
  getInitialState: function () {
    return {
      limit_detected: false,
      wait_posts: false,
      posts_count: 20,
      posts: []
    };
  },
  loadPostsFromServer: function() {
    $.ajax({
      url: this.props.posts_url,
      dataType: 'json',
      data: {
        count: this.state.posts_count
      },
      cache: false,
      success: function(data) {
        var limit_detected = (data.length < this.state.posts_count);
        this.setState({
          posts: data,
          limit_detected: limit_detected
        });
        this.setState({
          wait_posts: false
        });
      }.bind(this),
      error: function(xhr, status, err) {
        CE(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    $(window).scroll(function() {
      var scroll_part = $(window).scrollTop()/$(document).height();
      if (scroll_part > 0.8 && !this.state.limit_detected && !this.state.wait_posts ){
        this.setState({
          posts_count: this.state.posts_count + 10,
          wait_posts: true
        });
        this.loadPostsFromServer();
        CI("scrolling", scroll_part);
      }
    }.bind(this));
    //intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
  },
  componentWillUnmount: function(){
    $(window).unbind('scroll');
    //clearInterval(intervalID)
  },
  render: function () {
    var childElements = this.state.posts.map(function(post, i){
      return (<ExplorePost key={i} post={post}/>);
    });

    return (
      <Masonry
        className={'grid-wrap'}
        elementType={'div'}
        options={masonryOptions}
        disableImagesLoaded={false}
      >
        {childElements}
      </Masonry>
    );
  }
});

module.exports = Gallery;

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
  like_post(id){
    var posts = this.state.posts;
    var likedPost = $.grep(posts, function(e){ return e.id == id; });
    likedPost = likedPost[0];
    posts = posts.map(function(p){
      if (p.id == id){
        if (p.current_like){
          p.likes -= 1;
          p.current_like = false;
          p.current_like_just = false;
        } else {
          p.likes += 1;
          p.current_like = true
          p.current_like_just = true;
        }
      }
      return p;
    })
    this.setState({posts: posts});
    $.ajax({
      url: likedPost.like_path,
      type: 'PUT',
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    var self = this;
    var childElements = this.state.posts.map(function(post, i){
      return (
        <ExplorePost
          like_post={self.like_post}
          key={i}
          post={post}/>
      );
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

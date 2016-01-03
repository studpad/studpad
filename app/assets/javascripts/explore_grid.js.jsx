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
       return (
    <figure key={i}>
      <div className="autor-explore border-radius-top">
        <div className="avatar" style={{background: 'url('+post.author.avatar+') no-repeat', backgroundSize: 'cover'}}>
        </div>
        <div className="info">
        <div className='name'>
          <a href={post.author.url}>{post.author.name}</a>
        </div>
        <div className='follow'>
          Читать
        </div>
        </div>
      </div>
      <h3>{post.type}</h3>

      <figcaption className='content-board border-b-radius'>
      <p className='link'><img src="/images/link.png"/> <a>studpad.ru</a></p>
      <h3 className='title'>А почему бы не бухнуть?</h3>
      <p className='text'>Kale chips lomo biodiesel stumptown Godard Tumblr, mustache sriracha tattooed cray aute slow-carb placeat delectus. Letterpress asymmetrical fanny pack art party est pour-over skateboard anim quis, ullamco craft beer.</p>
      <p className='tags-sp'><span>#studpad</span> <span>#йога</span> <span>#друг</span></p>

      <footer>
        <div className='delicious-like'>
        <div>
          Просмотреть
        </div>
        <div>
          <span>
          <img ref='delicious_tooltip' title='Сохранить себе' data-toggle="tooltip" data-placement="top" src='images/delicious.png' />
          <span>
            5
          </span>
          </span>
          <span>
          <img ref='delicious_tooltip' title='Сохранить себе' data-toggle="tooltip" data-placement="top" src='images/like.png' />
          <span>
            5
          </span>
          </span>
        </div>
        </div>
      </footer>
      <div className='clearboth'>
      </div>
      </figcaption>
    </figure>
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

//$(document).on("page:load ready", function(){
  var data = [
    {author: "Pete Hunt", text: "This is one comment", avatarUrl:"/empty.png"},
    {author: "Jordan Walke", text: "This is *another* comment", avatarUrl:"/empty.png"}
  ];
  var intervalID;

  var Comment = React.createClass({
    render: function() {
      return(
      <div className='the-comment'>
        <div className='row'>
          <div className='col-xs-1 wrap-avatar-news'>
            <img src={this.props.author.avatar} width='40' height='40' className='img-avatar'/>
          </div>
          <div className='col-xs-11 the-comment-content'>
            <div className='comment-username'>
            <a href={this.props.author.urls}>{this.props.author.name}</a>
            </div>
            <div className='main-text-news'>
              <span className='span-main-text-comment'>{this.props.text}</span>
            </div>
            <div className='menu-of-form-send-comment-of-news'>
              <span className='date-news'>{this.props.time}</span>
            </div>
          </div>
        </div>
      </div>
      )
    }
  });

  var NewsItem = React.createClass({
    render: function() {
      var comments = this.props.comments.map(function (n) {
        return (
          <Comment author={n.author} text={n.text} time={n.time}/>
        );
      });
      return (
        <div id = 'form-send-news'>
        <div className='the-news row'>
          <div className='col-xs-1 wrap-avatar-news'>
            <img src={this.props.author.avatar} className='img-avatar'/>
          </div>
          <div className='col-xs-11'>
            <div className='content-the-news'>
              <div className='news-username'>
                <a href={this.props.author.url}>{this.props.author.name}</a>
              </div>
              <div className='main-text-news'>
                <span className='span-main-text-news'>
                {this.props.text}
                </span>
              </div>
              <div className='form-send-comment-of-news'>
                <div className='menu-of-form-send-comment-of-news'>
                  <span className='date-news'>{this.props.time}</span>&nbsp;&nbsp;
                  <span className='give-comment'>Комментировать</span>
                </div>
              </div>
              <div className = 'each-comment-of-the-news'>
                {comments}
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
  });

  var NewsList = React.createClass({
    render: function() {
      var newsItems = this.props.data.map(function (n) {
        return (
          <NewsItem author={n.author} text={n.text}
          time={n.time} comments={n.comments}/>
        );
      });
      return (
        <div className="commentList">
          {newsItems}
        </div>
      );
    }
  });

  var NewsForm = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
      var text = React.findDOMNode(this.refs.text).value.trim();
      if (!text) {
        return;
      }
      this.props.onNewsSubmit(text);
      React.findDOMNode(this.refs.text).value = '';
      return;
    },
    render: function() {
      return (
        <form className="new_news_item" id="new_news_item" onSubmit={this.handleSubmit}>
          <textarea className="form-control" ref='text' id="textHW" placeholder="Ваша новость..." name="news_item[text]" >
          </textarea>
          <div className='wrap-send-news'>
            <input type="submit" id='send-news' className="btn btn-primary btn-st" value="Опубликовать"/>
          </div>
        </form>
      );
    }
  });

  var NewsBox = React.createClass({
    getInitialState: function() {
      return {data: []};
    },
    loadNewsItemsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleNewsSubmit: function(text) {

      var newsItems = this.state.data;
      var piece = [{
          text: text,
          author: this.props.username,
          avatarUrl: this.props.userAvatar
        }];
      var newNewsItems = piece.concat(newsItems);
      this.setState({data: newNewsItems});
      newsItem = {'news_item[text]': text}
      newsItem.utf8 = "✓";
      newsItem.authenticity_token = this.props.token;
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: newsItem,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentDidMount: function() {
      this.loadNewsItemsFromServer();
      intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
    },
    componentWillUnmount: function(){
      clearInterval(intervalID)
    },
    render: function() {
      return (
        <div className="commentBox">
          <NewsForm onNewsSubmit={this.handleNewsSubmit}/>
          <NewsList data={this.state.data}/>
        </div>
      );
    }
  });
  // React.render(
  //   <NewsBox url="/news.json" pollInterval={2000}/>,
  //   document.getElementById('each-news')
  // );


//});

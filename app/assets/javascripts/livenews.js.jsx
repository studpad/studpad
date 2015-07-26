
var intervalID;
var formToken;

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
  getInitialState: function() {
    return {
      editable: false
    };
  },
  removeClick: function(){
    this.props.removeNewsItem(this.props.data.id);
  },
  editClick: function(){
    this.setState({editable: !this.state.editable});
  },
  updateClick: function(){
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.setState({editable: false});
    this.props.updateNewsItem(this.props.data.id, text);
  },
  render: function() {
    var comments = this.props.data.comments;
    comments = comments.map(function (n) {
      return (
        <Comment author={n.author} text={n.text} time={n.time}/>
      );
    });
    var mainPart;
    if (this.state.editable) {
      mainPart = (
        <div>
          <textarea ref='text' className='form-control textHW-update'
          defaultValue={this.props.data.text}/>
          <div className='wrap-send-button'>
            <button className="btn btn-primary btn-xs btn-st change-news"
            onClick={this.updateClick}>
              Сохранить
            </button>
          </div>
        </div>
        )
    } else {
      mainPart =(
        <div className='main-text-news'>
          <span className='span-main-text-news'>
           {this.props.data.text}
          </span>
        </div>
      )
    }
    return (
      <div id = 'form-send-news'>
      <div className='the-news row'>
        <div className='col-xs-1 wrap-avatar-news'>
          <img src={this.props.data.author.avatar} className='img-avatar'/>
        </div>
        <div className='col-xs-11'>
          <div className='content-the-news'>
            <div className = 'sign-sp close-news'>
              <span className="glyphicon glyphicon-pencil pencil-news"
              onClick={this.editClick}></span>
              &nbsp;&nbsp;
              <span className="glyphicon glyphicon-remove"
              onClick={this.removeClick}></span>
            </div>
            <div className='news-username'>
              <a href={this.props.data.author.url}>{this.props.data.author.name}</a>
            </div>
            {mainPart}
            <div className='form-send-comment-of-news'>
              <div className='menu-of-form-send-comment-of-news'>
                <span className='date-news'>{this.props.data.time}</span>&nbsp;&nbsp;
                <span className='give-comment'>Комментировать</span>
              </div>
            </div>
            <div className = 'each-comment-of-the-news'>
              {/*comments*/}
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
    var removeNewsItem = this.props.removeNewsItem;
    var updateNewsItem = this.props.updateNewsItem;
    var newsItems = this.props.data.map(function (n) {
      return (
        <NewsItem key={"newsItem" + n.id} data={n} removeNewsItem={removeNewsItem}
        updateNewsItem={updateNewsItem}/>
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
    formToken = this.props.token
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
  updateNewsItem: function(id, data){
    var url;
    var newNewsItems = this.state.data.map(function (n) {
      if (n.id == id){
        url = n.url;
        n.text = data;
      }
      return n;
    });
    this.setState({data: newNewsItems});
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: {
        'news_item[text]' : data,
        '_method': 'patch',
        authenticity_token: formToken
      }
    });
  },
  removeNewsItem: function(id) {
    var NewsItems = this.state.data
    var newNewsItems = $.grep(NewsItems, function(e){ return e.id != id; });
    var deletedItem = $.grep(NewsItems, function(e){ return e.id == id; });
    deletedItem = deletedItem[0]
    this.setState({data: newNewsItems});
    $.ajax({
      url: deletedItem.url,
      dataType: 'json',
      type: 'POST',
      data: {
        '_method': 'delete',
        authenticity_token: formToken
      }
    });
    //console.log("Удаление в родителе " + deletedItem.id)
  },
  handleNewsSubmit: function(text) {

    var newsItems = this.state.data;
    var piece = [{
        text: text,
        author: this.props.username,
        avatarUrl: this.props.userAvatar,
        comments: []
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
    //intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
  },
  componentWillUnmount: function(){
    //clearInterval(intervalID)
  },
  render: function() {
    return (
      <div className="commentBox">
        <NewsForm onNewsSubmit={this.handleNewsSubmit}/>
        <NewsList data={this.state.data} removeNewsItem={this.removeNewsItem}
        updateNewsItem={this.updateNewsItem}/>
      </div>
    );
  }
});

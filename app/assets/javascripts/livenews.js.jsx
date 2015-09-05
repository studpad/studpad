
var intervalID;
var formToken;
var currentUser;

var c = function(obj){//На время отладки
  console.log(obj);
};

var Comment = React.createClass({
  removeClick: function(){
    this.props.remove(this.props.data.id)
  },
  render: function() {
    var remove_link;
    if (this.props.data.can_remove) {
      remove_link = (
        <span
          className="glyphicon glyphicon-remove"
          onClick={this.removeClick}>
        </span>
        );
    }
    var edit_link;
    //this.props.data.can_edit
    if (false) {
      edit_link = (
        <span
          className="glyphicon glyphicon-pencil pencil-news"
          onClick={this.editClick}>
        </span>
        );
    }
    return(
    <div className='the-comment'>
      <div className='row'>
        <div className='col-xs-1 wrap-avatar-news'>
          <img src={this.props.data.author.avatar} width='40' height='40' className='img-avatar'/>
        </div>
        <div className='col-xs-11 the-comment-content'>
          <div className = 'sign-sp close-news'>
            {edit_link}
            &nbsp;&nbsp;
            {remove_link}
          </div>
          <div className='comment-username'>
          <a href={this.props.data.author.urls}>{this.props.data.author.name}</a>
          </div>
          <div className='main-text-news'>
            <span className='span-main-text-comment'>{this.props.data.text}</span>
          </div>
          <div className='menu-of-form-send-comment-of-news'>
            <span className='date-news'>{this.props.data.time}</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
});
var CommentForm = React.createClass({
  sendComment: function () {
    var textarea = React.findDOMNode(this.refs.text);
    var text = textarea.value.trim()
    if (!text) {
      return;
    }
    textarea.value = '';
    this.props.sendComment(text);
  },
  render: function () {
    if (this.props.visible){
      return (
        <div>
          <textarea ref="text" className='form-control textHW_comment my-setting-form-control'
            placeholder="Ваш комментарий..." />
          <button className="btn btn-primary btn-xs btn-st" onClick={this.sendComment}>
            Отправить
          </button>
        </div>
      )
    } else {
      return <div/>;
    }
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      comments: this.props.comments,
      commentable: false
    };
  },
  toggleCommentable: function(){
    this.setState({commentable: !this.state.commentable});
  },
  removeComment: function(id){
    var Comments = this.state.comments
    var newComments = $.grep(Comments, function(e){ return e.id != id; });
    var deletedComment = $.grep(Comments, function(e){ return e.id == id; });
    deletedComment = deletedComment[0]
    this.setState({comments: newComments});
    $.ajax({
      url: deletedComment.url,
      dataType: 'json',
      type: 'POST',
      data: {
        '_method': 'delete',
        authenticity_token: formToken
      }
    });
  },
  sendComment: function(text){
    this.toggleCommentable();
    var comments = this.state.comments;
    console.log(currentUser);
    var piece = [{
        text: text,
        author: currentUser
      }];
    var newComments = piece.concat(comments);
    this.setState({comments: newComments});
    newComment = {
      'comment[text]': text,
      'comment[commentable_id]': this.props.newsId,
      'comment[commentable_type]': 'NewsItem'
    }
    newComment.utf8 = "✓";
    newComment.authenticity_token = formToken
    $.ajax({
      url: '/comments',
      dataType: 'json',
      type: 'POST',
      data: newComment,
      success: function(data) {
        c(data);
        this.setState({comments: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    console.log(text);
  },
  render: function () {
    var removeComment = this.removeComment;
    var comments = this.state.comments;
    comments = comments.map(function (c) {
      return (
        <Comment key={"comment" + c.id} data={c} remove={removeComment} />
      );
    });
    return (
      <div>
        <div className='form-send-comment-of-news'>
          <div className='menu-of-form-send-comment-of-news'>
            <span className='date-news'>{this.props.time}</span>&nbsp;&nbsp;
            <span className='give-comment' onClick={this.toggleCommentable}>Комментировать</span>
          </div>
        </div>
        <CommentForm visible={this.state.commentable} sendComment={this.sendComment}/>
        <div className = 'each-comment-of-the-news'>
          {comments}
        </div>
      </div>
    );
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
    var remove_link;
    if (this.props.data.can_remove) {
      remove_link = (
        <span
          className="glyphicon glyphicon-remove"
          onClick={this.removeClick}>
        </span>
        );
    }
    var edit_link;
    if (this.props.data.can_edit) {
      edit_link = (
        <span
          className="glyphicon glyphicon-pencil pencil-news"
          onClick={this.editClick}>
        </span>
        );
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
              {edit_link}
              &nbsp;&nbsp;
              {remove_link}
            </div>
            <div className='news-username'>
              <a href={this.props.data.author.url}>{this.props.data.author.name}</a>
            </div>
            {mainPart}
            <CommentBox newsId={this.props.data.id} comments={this.props.data.comments} time={this.props.data.time}/>
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
    currentUser = {
      name: this.props.username,
      avatar: this.props.userAvatar,
      url: this.props.userUrl
    }
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
        author: currentUser,
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

var NewsBox = React.createClass({
  getInitialState: function() {
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
      type: 'PATCH',
      data: {
        'news_item[text]' : data
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
      type: 'DELETE'
    });
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

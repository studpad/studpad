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

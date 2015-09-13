// var PostAll = React.createClassName({
//   updatePost: function(id, data){
//     var url;
//     var newNewsItems = this.state.data.map(function (n) {
//       if (n.id == id){
//         url = n.url;
//         n.text = data;
//       }
//       return n;
//     });
//     this.setState({data: newNewsItems});
//     $.ajax({
//       url: url,
//       dataType: 'json',
//       type: 'PATCH',
//       data: {
//         'news_item[text]' : data
//       }
//     });
//   },
//   removePost: function(id) {
//     var NewsItems = this.state.data
//     var newNewsItems = $.grep(NewsItems, function(e){ return e.id != id; });
//     var deletedItem = $.grep(NewsItems, function(e){ return e.id == id; });
//     deletedItem = deletedItem[0]
//     this.setState({data: newNewsItems});
//     $.ajax({
//       url: deletedItem.url,
//       type: 'DELETE'
//     });
//   },
//


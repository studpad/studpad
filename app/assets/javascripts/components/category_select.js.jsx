var CategorySelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).selectize({
      options: window.categories,
      items: this.props.values
    })
    //$(this.refs.input).val(['1'])
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  saveClick(){
    var data =  {
      visible: this.refs.visible.checked,
      recommended: this.refs.recommend.checked,
      category_ids: $(this.refs.input).val()
    }
    //cl
    console.log(data);
    //alert(this.refs.recommend.checked);
    $.ajax({
      url: this.props.url + '/change_categories',
      //dataType: 'json',
      data: data,
      type: 'PUT',
      success: function(data) {
        //alert($(this.refs.recommend).val());
      }
    });
  },
  render: function(){
    // var selected = this.props.values || [];
    // var rendered_options = $.map(selected, function (e, index) {
    //   return (<option key={index} value={e.id}>{e.name}</option>);
    // });
    return (
      <div className = 'post-tags-create clearboth'>
        Категории
        <button onClick={this.saveClick}>Сохранить</button>
        <label>Рекомендованное</label>
        <input ref='recommend' defaultChecked={this.props.recommended} type="checkbox"/>
        <label>Показывать в новом</label>
        <input ref='visible' defaultChecked={this.props.visible} type="checkbox"/>
        <select
          ref='input'
          multiple
          style={{width: '100%', visibility:'hidden'}} >
        </select>
        <div className = 'tags-sp'>
        </div>
      </div>
    );
  }
});

const CitySelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).selectize({
      placeholder: "Город",
      load: function(query, callback) {
        CL('selectize', query, callback);
        if (query.length < 3) return callback();
        $.ajax({
          url: '/ajax/get_cities?term=' + encodeURIComponent(query),
          type: 'GET',
          error: function() {
            callback();
          },
          success: function(data) {
            var result = data.map(function(e){return {value: e.id, text: e.name}});
            //CL(result);
            callback(result);
          }
        });
      }
    }).on("change", function (e) {
      //CL($(e.target).val());
      this.props.onChange(e);
    }.bind(this))
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render(){
    // var selected = this.props.values || [];
    // var rendered_options = $.map(selected, function (name, index) {
    //   return (<option key={index} value={name}>{name}</option>);
    // });
    var name = this.props.city_name
    return (
      <div className = 'post-tags-create clearboth'>
        <select
          ref='input'
          defaultValue={name}
          style={{width: '100%', visibility:'hidden'}} >
          <option value={name}>{name}</option>
        </select>
        <div className = 'tags-sp'>
        </div>
      </div>
    );
  }
});

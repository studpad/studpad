const TagSelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).selectize({
      splitOn: /#/,
      delimiters_array: [',', "#"],
      persist: false,
      placeholder: "#Теги",
      create: function(input) {
        return {
          value: input,
          text: input
        }
      },
      render: {
        option_create: function(data, escape) {
          return '<div class="create">Добавить <strong>' + escape(data.input) + '</strong>&hellip;</div>';
        }
      },
      load: function(query, callback) {
        CL('selectize', query, callback);
        if (query.length < 3) return callback();
        $.ajax({
          url: '/tags?term=' + encodeURIComponent(query),
          type: 'GET',
          error: function() {
            callback();
          },
          success: function(data) {
            var result = data.map(function(e){return {value: e.name, text: e.name}});
            CL(result);
            callback(result);
          }
        });
      }
    }).on("change", function (e) {
      this.props.setTags($(e.target).val());
    }.bind(this))
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render(){
    var selected = this.props.values || [];
    var rendered_options = $.map(selected, function (name, index) {
      return (<option key={index} value={name}>{name}</option>);
    });
    return (
      <div className = 'post-tags-create clearboth'>
        <select
          ref='input'
          multiple
          defaultValue={selected}
          style={{width: '100%', visibility:'hidden'}} >
          {rendered_options}
        </select>
        <div className = 'tags-sp'>
        </div>
      </div>
    );
  }
});

const TagSelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).selectize({
      delimiter: ',',
      persist: false,
      placeholder: "#Теги",
      create: function(input) {
          return {
              value: input,
              text: input
          }
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
    })
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

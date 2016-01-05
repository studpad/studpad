const TagSelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).select2({
      placeholder: "#Теги",
      delay: 1000,
      ajax: {
        url: "/tags.json",
        cache: "true",
        processResults: function (data) {
          result = data.map(function(t){
            return {text: t.name, id: t.name};
          });
          CL(result);
          return {
            results: result
          };
        }
      },
      minimumInputLength: 3,
      allowClear: true,
      tags: true,
      multiple: true
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

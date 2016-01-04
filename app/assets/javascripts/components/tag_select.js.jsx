const TagSelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).select2({
      tags: "true",
      placeholder: "Наберите тэг",
      ajax: {
        url: "/tags.json",
        cache: "true",
        processResults: function (data) {
          // CL(data);
          return {
            results: data
          };
        }
      },
      minimumInputLength: 3,
      allowClear: true,
      multiple: true
      }).on("change", function (e) {
        this.props.setTags($(e.target).val());
      }.bind(this));
    },

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render(){
    return (
      <div className = 'post-tags-create clearboth'>
        <select ref='input' multiple='multiple' style={{width: '100%', visibility: 'hidden'}} >
        </select>
        <div className = 'tags-sp'>
        </div>
      </div>
    );
  }
});

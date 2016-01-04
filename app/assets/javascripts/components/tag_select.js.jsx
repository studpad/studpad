const TagSelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).select2({
      tags: "true",
  placeholder: "Наберите тэг",
  data: [{id: 3, text: 'hello'}, {id: 3, text: 'hello'}],
  allowClear: true,
    multiple: true
    });
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render(){
    return (
      <div className = 'post-tags-create'>
        <select ref='input' style={{width: '100%', visibility: 'hidden'}} >
        </select>
        <div className = 'tags-sp'>
        </div>
      </div>
    );
  }
});

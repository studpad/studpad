var ElementTypes = {text: 'text', image: 'image', divider: 'divider'}
var PostElement = React.createClass({
  handleChange: function() {
      this.props.onChangeElementText(
        this.props.id_element,
        this.refs.textElement.getDOMNode().value
    );
  },
  handleRemoveElementPost: function() {
      this.props.onRemoveElementPost(
        this.props.id_element
    );
  },
  render: function() {
    var textPlaceholder;
    var element_content;
    switch (this.props.element.type) {
      case ElementTypes.text:

        if(this.props.typePost == PostTypes.text){
          textPlaceholder = 'Введите текст';
        }else if(this.props.typePost == PostTypes.link || this.props.typePost == PostTypes.file){
          textPlaceholder = 'Если хотите, добавьте описание';
        }else{
          textPlaceholder = '- Источник';
        }

        element_content = (
          <div className = 'usual-post-text action-create-element-post'>
            <button className="remove-angle" onClick={this.handleRemoveElementPost}>&times;</button>
            <textarea
              ref='textElement'
              className='textarea-new-post textarea-sp form-control'
              value={this.props.element.value}
              placeholder = {textPlaceholder}
              onChange={this.handleChange}>
            </textarea>
          </div>
        );
        break;
        case ElementTypes.image:
          element_content = (
              <div className = 'usual-post-photo action-create-element-post'>
                <button className="remove-angle" onClick={this.handleRemoveElementPost}>&times;</button>
                <img src = 'https://cs7055.vk.me/c7002/v7002255/ba8d/OcPxI5Ef07s.jpg' />
              </div>
          );
        break;
        case ElementTypes.divider:
          element_content = (
              <div>
                <button className="remove-angle remove-for-divider" onClick={this.handleRemoveElementPost}>&times;</button>
                <div className = 'usual-post-devider action-create-element-post'> 
                </div>
              </div>
          );
        break;
        default:
      console.log("Undefined type");
    }
    
    return (
      <div>
        {element_content}
      </div>
    );
  }
});

var PostText = React.createClass({
  getInitialState: function() {
    return {
      elements: [{
        value: '',
        type: ElementTypes.text,
        display: 1
      }]
    };
  },
  removeElementPost: function(id_element) {
    var new_one;
    new_one = this.state.elements;
    new_one.splice(id_element, 1);
    this.setState({
      elements: new_one
    })
  },
  changeElementText: function(id_element, value_element) {
    var new_one;
    new_one = this.state.elements;
    new_one[id_element].value = value_element;
    this.setState({
      elements: new_one
    })
  },
  addElement: function(value, type) {
    var new_one;
    new_one = this.state.elements;
    current_element = {
      value: value,
      type: type,
      display: 1
    };
    new_one.push(current_element);

    new_one.forEach(function(element) {
        if (element.value == '' && element.display == 1) {
            element.display = 0;
        }
    });

    current_element = {
      value: '',
      type: ElementTypes.text,
      display: 1
    };
    new_one.push(current_element);
    this.setState({
      elements: new_one
    })
  },
  render: function() {
    var elements = this.state.elements;
    var full_elements = $.grep(elements, function(e){ return (e.display == 1) });
    var empty_elements = $.grep(elements, function(e){ return (e.display != 1) });
    full_elements = full_elements.map(function (c, id_element) {
      return <PostElement element={c} 
              id_element={id_element + empty_elements.length} 
              key={id_element} 
              onChangeElementText={this.changeElementText} 
              typePost={this.props.typePost}
              onRemoveElementPost={this.removeElementPost}/>
    }.bind(this));

    return (
      <div>
        <PostTextElement addElement={this.addElement}/>
        {full_elements}
      </div>
    );
  }
});

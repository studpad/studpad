var ElementTypes = {text: 'text', image: 'image', divider: 'divider'}
var PostElement = React.createClass({
  handleChange: function() {
    this.props.onChangeElementText(
      this.props.position,
      this.refs.textElement.getDOMNode().value
    );
  },
  handleRemoveElementPost: function() {
    this.props.onRemoveElementPost(
      this.props.position
    );
  },
  componentDidMount: function() {
    if(this.props.position == this.props.lengthElements - 1){
      this.refs.textElement.getDOMNode().focus();
    }
  },
  render: function() {
    var textPlaceholder;
    var element_content;
    var remove_button = <button className="remove-angle" onClick={this.handleRemoveElementPost}>&times;</button>
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
            {remove_button}
            <textarea
              ref='textElement'
              className='textarea-new-post textarea-sp form-control'
              value={this.props.element.value}
              placeholder = {textPlaceholder}
              onChange={this.handleChange}
              onLoad={this.handleAutofocus}>
            </textarea>
          </div>
        );
        break;
      case ElementTypes.image:
        element_content = (
            <div className = 'usual-post-photo action-create-element-post'>
              {remove_button}
              <img src = {this.props.element.data.link} />
            </div>
        );
        break;
      case ElementTypes.divider:
        element_content = (
            <div>
              {remove_button}
              <div className = 'usual-post-devider create-usual-post-divider action-create-element-post'/>
              <div className = 'clearboth' />
            </div>
        );
        break;
      default:
        console.log('Undefined PostText type');
    }
    return element_content;
  }
});




var PostText = React.createClass({
  getInitialState: function() {
    return {
      elements: [{
        value: '',
        type: ElementTypes.text
      }]
    };
  },
  getData: function(){
    return this.state.elements;
  },
  addImage: function(attachement_data) {
    var elements = this.state.elements;
    elements.push({type: ElementTypes.image, data: attachement_data});
    elements.push({type: ElementTypes.text, value: ''});
    this.setState({
      elements: elements
    });
  },
  addDevider: function(){
    var elements = this.state.elements;
    elements.push({type: ElementTypes.divider});
    elements.push({type: ElementTypes.text, value: ''});
    this.setState({
      elements: elements
    });
  },
  removeElementPost: function(position) {
    var elements = this.state.elements;
    elements.splice(position, 1);
    this.setState({
      elements: elements
    })
  },
  changeElementText: function(position, value_element) {
    var elements = this.state.elements;
    elements[position].value = value_element;
    this.setState({
      elements: elements
    })
  },
  render: function() {
    var elements = this.state.elements;
    var length = elements.length;
    rendered_elements = elements.map(function (e, position) {
      return <PostElement element={e}
              position={position}
              key={position}
              onChangeElementText={this.changeElementText}
              typePost={this.props.typePost}
              onRemoveElementPost={this.removeElementPost}
              lengthElements={length}/>
    }.bind(this));

    return (
      <div>
        <PostTextElement
          addImage={this.addImage}
          addDevider={this.addDevider}/>
        {rendered_elements}
      </div>
    );
  }
});

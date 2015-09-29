var PostText = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    addImage: React.PropTypes.func.isRequired,
    addDivider: React.PropTypes.func.isRequired,
    removeTextElement: React.PropTypes.func.isRequired,
    text_elements: React.PropTypes.array.isRequired
  },
  //END*****************************************************DECLARE
  render: function() {
    var elements = this.props.text_elements;
    var length = elements.length;
    rendered_elements = elements.map(function (e, position) {
      return <PostTextElement
                key={position}
                element={e}
                position={position}
                onChangeElementText={this.props.changeElementText}
                removeTextElement={this.props.removeTextElement}
                lengthElements={length}/>
    }.bind(this));

    return (
      <div>
        <PostTextManagmentPanel
          addImage={this.props.addImage}
          addDivider={this.props.addDivider}/>
        {rendered_elements}
      </div>
    );
  }
});

var PostTextElement = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    element: React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      text: React.PropTypes.string
    })
  },
  //END*****************************************************DECLARE
  handleChange: function(e) {
    this.props.onChangeElementText(
      this.props.position,
      e.target.value
    );
  },
  handleRemoveElementPost: function() {
    this.props.removeTextElement(
      this.props.position
    );
  },
  componentDidMount: function() {
    // if(this.props.position == this.props.lengthElements - 1){
    //   this.refs.textElement.getDOMNode().focus();
    // }
  },
  render: function() {
    var textPlaceholder;
    var element_content;
    var remove_button = <button className='remove-angle' onClick={this.handleRemoveElementPost}>&times;</button>
    switch (this.props.element.type) {
      case ElementTypes.text:
        // if(this.props.typePost == PostTypes.text){
        textPlaceholder = 'Введите текст';
        // }else if(this.props.typePost == PostTypes.link || this.props.typePost == PostTypes.file){
        //   textPlaceholder = 'Если хотите, добавьте описание';
        // }else{
        //   textPlaceholder = '- Источник';
        // }
        element_content = (
          <div className = 'usual-post-text action-create-element-post'>
            {remove_button}
            <textarea
              ref='textElement'
              className='textarea-new-post textarea-sp form-control'
              value={this.props.element.text}
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
              <img src = {this.props.element.url} />
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
        CE('Undefined PostText type');
    }
    return element_content;
  }
});

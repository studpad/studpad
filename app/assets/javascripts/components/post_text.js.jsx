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
      switch (e.type) {
        case ElementTypes.text:
          return (
            <PostTextTextarea
              key={position}
              text={e.text}
              position={position}
              onChangeElementText={this.props.changeElementText}
              removeTextElement={this.props.removeTextElement}
              typePost={this.props.typePost}/>
          );
        case ElementTypes.image:
          return (
            <PostTextImage
              key={position}
              url={e.url}
              position={position}
              removeTextElement={this.props.removeTextElement}/>
          );
        case ElementTypes.divider:
          return (
            <PostTextDivider
              key={position}
              position={position}
              removeTextElement={this.props.removeTextElement}/>
            );
        default:
          CE('Undefined PostText type');
      }
      // return <PostTextElement
      //           key={position}
      //           element={e}
      //           position={position}
      //           onChangeElementText={this.props.changeElementText}
      //           removeTextElement={this.props.removeTextElement}
      //           lengthElements={length}/>
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

var PostTextTextarea = React.createClass({
  //BEGIN***************************************************DECLARE
  // propTypes: {
  //   element: React.PropTypes.shape({
  //     type: React.PropTypes.string.isRequired,
  //     text: React.PropTypes.string
  //   })
  // },
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
    var node = this.refs.textElement.getDOMNode();
    $(node).autoResize({
      limit:600,
      extraSpace:0,
      animate:true
    });
    $(node).change();
    $(node).focus();
  },
  componentWillUnmount: function() {
    // var node = this.refs.textElement.getDOMNode();
    // node = $(node).data('AutoResizer');
    // if (node) {
    //   node.destroy();
    // }
  },
  render: function() {
    var textPlaceholder = 'Введите текст';
    if(this.props.typePost == PostTypes.link) textPlaceholder = 'Если хотите, можете добавить описание.';
    else if(this.props.typePost == PostTypes.quotation) textPlaceholder = 'Укажите источник';
    else if(this.props.typePost == PostTypes.file) textPlaceholder = 'Введите название Вашей работы, описание, кому она предназначена';
    if (this.props.position != 0)
      var remove_button = <img onClick={this.handleRemoveElementPost} className='remove-angle all-remove-angle' src = '/images/close.png' />
    return (
      <div className = 'usual-post-text action-create-element-post'>
        {remove_button}
        <textarea
          ref='textElement'
          className='textarea-new-post textarea-sp form-control'
          value={this.props.text}
          placeholder = {textPlaceholder}
          onChange={this.handleChange}
          onLoad={this.handleAutofocus}>
        </textarea>
      </div>
    );
  }
});

var PostTextImage = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    removeTextElement: React.PropTypes.func.isRequired,
    url: React.PropTypes.string.isRequired
  },
  //END*****************************************************DECLARE
  handleRemoveElementPost: function() {
    this.props.removeTextElement(
      this.props.position
    );
  },
  render: function() {
    return (
      <div className = 'usual-post-photo action-create-element-post'>
        <img onClick={this.handleRemoveElementPost} className='remove-angle all-remove-angle' src = '/images/close.png' />
        <img src = {this.props.url} />
      </div>
    );
  }
});

var PostTextDivider = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    removeTextElement: React.PropTypes.func.isRequired
  },
  //END*****************************************************DECLARE
  handleRemoveElementPost: function() {
    this.props.removeTextElement(
      this.props.position
    );
  },
  render: function() {
    return (
      <div>
        <img onClick={this.handleRemoveElementPost} className='remove-angle devider-remove-angle' src = '/images/close.png' />
        <div className = 'usual-post-devider create-usual-post-divider action-create-element-post'/>
        <div className = 'clearboth' />
      </div>
    );
  }
});

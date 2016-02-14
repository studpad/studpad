var PostText = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    focus: React.PropTypes.bool,
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
              focus={e.focus}
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
          showTips={this.props.showTips}
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
  // componentDidMount: function() {
  //   var node = this.refs.textElement.getDOMNode();
  //   $(node).autoResize({
  //     limit:600,
  //     extraSpace:0,
  //     animate:true
  //   });
  //   CW('text DidMount');
  //   //for copy/paste
  //   $(node).bind('paste', function () {
  //       var $textarea = $(this);
  //       setTimeout(function () {
  //         $textarea.trigger("change.dynSiz");
  //       }, 250);
  //   });
  //   $(node).change();
  //   if (this.props.focus)
  //     $(node).focus();
  // },
  // componentWillUnmount: function() {
  //   var node = this.refs.textElement.getDOMNode();
  //   // node = $(node).data('AutoResizer');
  //   if (node) {
  //     $(node).unbind('paste');
  //   }
  // },

  // <div
  //   ref='textElement'
  //   contentEditable='true'
  //   className='text-new-post'
  //   value={this.props.text}
  //   placeholder = {textPlaceholder}
  //   onChange={this.handleChange}
  //   onLoad={this.handleAutofocus}>
  // </div>
  render: function() {
    var textPlaceholder = 'Если хотите, можете добавить описание';
    var textTags = '#Теги';
    /*if(this.props.typePost == PostTypes.link) textPlaceholder = 'Если хотите, можете добавить описание';
    else if(this.props.typePost == PostTypes.quotation) textPlaceholder = 'Здесь укажите источник';
    else if(this.props.typePost == PostTypes.file) textPlaceholder = 'Обязательно введите название Вашей работы, описание, кому она предназначена';
    else if(this.props.typePost == PostTypes.video) textPlaceholder = 'Если хотите, можете добавить описание видеоролика';
    else if(this.props.typePost == PostTypes.photo) textPlaceholder = 'Если хотите, можете добавить описание';*/
    if (this.props.position != 0)
      var remove_button = <img onClick={this.handleRemoveElementPost} className='remove-angle text-all-remove-angle' src = '/images/close.png' />
    return (
      <div className = 'padding-usual-post-text-create'>
        <div className = 'usual-post-text-create action-create-element-post'>
          {remove_button}
          <ContentEditableDiv
            onChange={this.handleChange}
            placeholder={textPlaceholder}
            focus={this.props.focus}
            cssClass='text-new-post'
            html={this.props.text}/>
        </div>
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
        <img onClick={this.handleRemoveElementPost} className='remove-angle text-photo-remove-angle' src = '/images/close.png' />
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

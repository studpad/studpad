//FUNCTION FOR ACCEPT FILES BEGIN
var accept = function(file, acceptedFiles) {
  if (acceptedFiles) {
    const acceptedFilesArray = acceptedFiles.split(',');
    const mimeType = file.type;
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    return acceptedFilesArray.some(type => {
      const validType = type.trim();
      if (validType.charAt(0) === '.') {
        return (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1);
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
};
//FUNCTION FOR ACCEPT FILES END

var DropzoneComponent = React.createClass({

  getDefaultProps: function() {
    return {
      disableClick: false,
      multiple: false
    };
  },

  getInitialState: function() {
    return {
      isDragActive: false
    };
  },

  propTypes: {
    onDrop: React.PropTypes.func,
    onDropAccepted: React.PropTypes.func,
    onDropRejected: React.PropTypes.func,
    onDragEnter: React.PropTypes.func,
    onDragLeave: React.PropTypes.func,

    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    rejectClassName: React.PropTypes.string,

    disableClick: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    accept: React.PropTypes.string,
  },

  allFilesAccepted: function(files) {
    return files.every(file => accept(file, this.props.accept))
  },

  onDragEnter: function(e) {
    e.preventDefault();

    var dataTransferItems = Array.prototype.slice.call(e.dataTransfer ? e.dataTransfer.items : e.target.files);
    var allFilesAccepted = this.allFilesAccepted(dataTransferItems);

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });

    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  },

  onDragOver: function (e) {
    e.preventDefault();
  },

  onDragLeave: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  },

  onDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    var max = this.props.multiple ? droppedFiles.length : 1;
    var files = [];

    for (var i = 0; i < max; i++) {
      console.log('pure fiels', droppedFiles[i])
      var file = droppedFiles[i];
      file.preview = URL.createObjectURL(file);
      files.push(file);
    }

    if (this.props.onDrop) {
      this.props.onDrop(files, e);
    }

    if (this.allFilesAccepted(files)) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted(files, e);
      }
    } else {
      if (this.props.onDropRejected) {
        this.props.onDropRejected(files, e);
      }
    }
  },

  onClick: function () {
    if (!this.props.disableClick) {
      this.open();
    }
  },

  open: function() {
    var fileInput = React.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  },

  render: function() {

    var className;
    if (this.props.className) {
      className = this.props.className;
      if (this.state.isDragActive) {
        className += ' ' + this.props.activeClassName;
      };
      if (this.state.isDragReject) {
        className += ' ' + this.props.rejectClassName;
      };
    };

    var style, activeStyle;
    if (this.props.style) {
      style = this.props.style;
      activeStyle = this.props.activeStyle;
    } else if (!className) {
      style = {
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5,
      };
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
    }

    var appliedStyle = style;
    // if (style && this.state.isDragActive) {
    //   appliedStyle = {
    //     ...style,
    //     ...activeStyle
    //   };
    // } else {
    //   appliedStyle = {
    //     ...style
    //   };
    // };

    return (
      <div
        className={'drop-zone margin-b40 dz-clickable'}
        onClick={this.onClick}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        {this.props.children}
        <input
          type='file'
          ref='fileInput'
          style={{ display: 'none' }}
          multiple={this.props.multiple}
          accept={this.props.accept}
          onChange={this.onDrop}
        />
      </div>
    );
  }

});

var DropzonePure = React.createClass({

  getDefaultProps: function() {
    return {
      disableClick: false,
      multiple: false
    };
  },

  propTypes: {
    onDrop: React.PropTypes.func,
    onDropAccepted: React.PropTypes.func,
    onDropRejected: React.PropTypes.func,
    onDragEnter: React.PropTypes.func,
    onDragLeave: React.PropTypes.func,

    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    rejectClassName: React.PropTypes.string,

    disableClick: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    accept: React.PropTypes.string,
  },

  allFilesAccepted: function(files) {
    return files.every(file => accept(file, this.props.accept))
  },

  onDragEnter: function(e) {
    e.preventDefault();

    var dataTransferItems = Array.prototype.slice.call(e.dataTransfer ? e.dataTransfer.items : e.target.files);
    var allFilesAccepted = this.allFilesAccepted(dataTransferItems);

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });

    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  },

  onDragOver: function (e) {
    e.preventDefault();
  },

  onDragLeave: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  },

  onDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    var max = this.props.multiple ? droppedFiles.length : 1;
    var files = [];

    for (var i = 0; i < max; i++) {
      console.log('pure fiels', droppedFiles[i])
      var file = droppedFiles[i];
      file.preview = URL.createObjectURL(file);
      files.push(file);
    }

    if (this.props.onDrop) {
      this.props.onDrop(files, e);
    }

    if (this.allFilesAccepted(files)) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted(files, e);
      }
    } else {
      if (this.props.onDropRejected) {
        this.props.onDropRejected(files, e);
      }
    }
  },

  onClick: function () {
    if (!this.props.disableClick) {
      this.open();
    }
  },

  open: function() {
    var fileInput = React.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  },

  render: function() {

    var className;
    if (this.props.className) {
      className = this.props.className;
      if (this.state.isDragActive) {
        className += ' ' + this.props.activeClassName;
      };
      if (this.state.isDragReject) {
        className += ' ' + this.props.rejectClassName;
      };
    };

    var style, activeStyle;
    if (this.props.style) {
      style = this.props.style;
      activeStyle = this.props.activeStyle;
    } else if (!className) {
      style = {
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5,
      };
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
    }

    var appliedStyle = style;
    // if (style && this.state.isDragActive) {
    //   appliedStyle = {
    //     ...style,
    //     ...activeStyle
    //   };
    // } else {
    //   appliedStyle = {
    //     ...style
    //   };
    // };

    return (
      <input
        type='file'
        ref='fileInput'
        style={{ display: 'none' }}
        multiple={this.props.multiple}
        accept={this.props.accept}
        onChange={this.onDrop}
      />
    );
  }

});



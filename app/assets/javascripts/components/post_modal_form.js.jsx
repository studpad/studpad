const PostModalForm = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    createPost: React.PropTypes.func.isRequired,
    updatePost: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      post: {
        author: window.currentUser,
        type: PostTypes.text,
        link_data: {},
        text_elements: [],
        files: [],
      },
      visible: false,
    };
  },
  //END*****************************************************DECLARE
  //BEGIN***************************************************ACTIONS
  newPost: function(postType) {
    this.setState({
      post: {
        type: postType,
        author: window.currentUser,
        city_id: window.currentUser.city_id,
        city_name: window.currentUser.city_name,
        title: '',
        youtube_id: '',
        linkdata: {},
        text_elements: [{type: ElementTypes.text, text: ''}],
        files: [],
        youtube_id: '',
        photos: [],
        attachment_ids: []
      },
      showTips: true,
      visible: true
    });
    CI('PostModalForm::newPost', postType);
  },
  editPost: function(postData) {
    this.setState({
      post: postData,
      showTips: false,
      visible: true
    })
  },
  validate: function(postData){
    if (postData.type == PostTypes.quotation && !postData.title.trim() )
      return false;
    if (postData.type == PostTypes.photo && !postData.photos.length )
      return false;
    if (postData.type == PostTypes.video && !postData.youtube_id.trim())
      return false;
    if (postData.type == PostTypes.link && !postData.linkdata.domain )
      return false;
    if (postData.type == PostTypes.file && postData.files.length == 0 )
      return false;
    if (postData.type == PostTypes.text || postData.type == PostTypes.file){
      var text_invalid = true;
      //CE(postData.text_elements);
      for (var i = 0, len = postData.text_elements.length; i < len; ++i) {
        var current = postData.text_elements[i];
        //debugger
        if (current.type == ElementTypes.image ||
            current.type == ElementTypes.text && current.text.trim() ){
          text_invalid = false;
          break;
        }
      }
      if (postData.title && postData.title.trim())
        text_invalid = false;
      if (text_invalid)
        return false;
    }
    return true;
  },
  submitForm: function () {
    var postData = this.state.post;
    if(!this.validate(postData))
      return;
    CI('PostModalForm::submitForm', postData);
    if (postData.id){
      this.props.updatePost(postData);
    } else {
      this.props.createPost(postData);
    }
    this.hide();
  },
  //END*****************************************************ACTIONS
  //BEGIN***************************************************HELPERS
  setTags(values){
    post = this.state.post;
    post.tags= values;
    this.setState({
      post: post
    });
    CL(values);
  },
  hide: function() {
    this.setState({
      visible: false
    });
    CI('PostModalForm::hide');
  },
  removeAttachment: function(attachmentId){
    var post = this.state.post;
    var files = post.files;
    CI('Attacments', files);
    files = $.grep(files, function(f){ return f.id != attachmentId });
    CI('Attacments', files);
    //post.attachment_ids |= [];
    post.attachment_ids = $.grep(post.attachment_ids, function(id){ return id != attachmentId });
    post.files = files;
    this.setState({
      post: post
    });
    CI('PostModalForm::removeAttachment', attachmentId);
  },
  addAttachment: function(attachmentData){
    var post = this.state.post;
    var files = post.files;
    files.push({
      id: attachmentData.id,
      name: attachmentData.name,
      url: attachmentData.link
    });
    //post.attachment_ids |= [];
    post.attachment_ids.push(attachmentData.id)
    post.files = files;
    this.setState({
      post: post
    });
  },
  addImage: function(attachementData) {
    var post = this.state.post;
    var elements = post.text_elements;
    elements = $.grep(elements, function(e){
      return (e.type != ElementTypes.text || e.text.trim());
    });
    elements.push({
      type: ElementTypes.image,
      data: attachementData,
      url: attachementData.link
    });
    elements.push({
      type: ElementTypes.text,
      text: '',
      focus: true
    });
    post.text_elements = elements;
    this.setState({
      post: post
    });
  },
  addDivider: function(){
    var post = this.state.post;
    var elements = post.text_elements;
    elements = $.grep(elements, function(e){
      return (e.type != ElementTypes.text || e.text.trim());
    });
    elements.push({type: ElementTypes.divider});
    elements.push({
      type: ElementTypes.text,
      focus: true,
      text: ''
    });
    post.text_elements = elements;
    this.setState({
      post: post
    });
  },
  addPhoto: function(data){
    CI('PostModalForm::addPhoto', data);
    var post = this.state.post;
    post.photos.push(data);
    this.setState({
      post: post
    });
  },
  removePhoto: function(id){
    CI('PostModalForm::removePhoto', id);
    var post = this.state.post;
    post.photos = post.photos.filter(function(p){return p.id != id});
    this.setState({
      post: post
    });
  },
  focusTextElement: function() {
    var post = this.state.post;
    var elements = post.text_elements;
    post.text_elements.forEach(function(e){e.focus = true});
    this.setState({
      post: post
    });
  },
  removeTextElement: function(position) {
    var post = this.state.post;
    var elements = post.text_elements;
    elements.splice(position, 1);
    post.text_elements = elements;
    this.setState({
      post: post
    });
  },
  changeElementText: function(position, value_element) {
    var post = this.state.post
    var elements = post.text_elements;
    elements[position].text = value_element;
    post.text_elements = elements;
    this.setState({
      post: post
    });
  },
  changeTitle: function(e){
    var post = this.state.post;
    post.title = e.target.value;
    this.setState({
      post: post
    });
  },
  changeCity: function(e){
    var post = this.state.post;
    post.city_id = e.target.value;
    CL(post)
    this.setState({
      post: post
    });
  },
  changeVideo: function(youtube_id){
    var post = this.state.post;
    CE(youtube_id)
    post.youtube_id = youtube_id;
    this.setState({
      post: post
    });
  },
  appendLinkImage(src){
    var post = this.state.post;
    if(!post.linkdata.loadedimages)
      post.linkdata.loadedimages = [];
    if (post.linkdata.loadedimages.length < 9){
      post.linkdata.loadedimages.push(src);
      this.setState({
        post: post
      });
    }
  },
  chooseLinkImage(src){
    post = this.state.post;
    post.linkdata.image_url = src;
    CI('Choosed', src, this.state.post);
    this.setState({
      post: post
    });
  },
  onChangeLink: function(event) {
    url = event.target.value;
    console.log(url);
    if (this.state.timeout_id)
      clearTimeout(this.state.timeout_id);
    var self = this;
    var timeout_id = setTimeout(function(){
      $.ajax({
        url: '/ajax/page_description',
        dataType: 'JSON',
        data: {url: url},
        cache: false,
        success: function(data) {
          var desc = data ? data : {images: []};
          //data.images ||= [];
          var post = self.state.post;
          //CL(data.images);
          $.each(desc.images, function(i, src){
            var img = new Image();
            img.onload = function(){
              CL(src);
              if (this.height > 100 && this.width > 100)
                self.appendLinkImage(this.src);
            };
            if (src.indexOf('http') > -1 || src.indexOf('//') > -1)
              img.src = src;
            else
              img.src = 'http://'+ data.domain + src;
          });
          post.linkdata = desc;
          self.setState({
            post: post
          });
        },
        error: function(xhr, status, err) {
          CE("PostModalForm::onChangeLink", xhr, status, err);
        }
      });
    }, 1000);
    this.setState({timeout_id: timeout_id});
  },
  //END*****************************************************HELPERS
  render: function() {
    return (
    <ReactBootstrap.Modal
      onHide={this.hide}
      backdrop='static'
      show={this.state.visible}>
      <div className='modal-content modal-content-new-post my-setting-modal-content'>
        <PostModalAuthor
          author={this.state.post.author}
          onChange={this.changeCity}
          city_name={this.state.post.city_name}
          />
        <PostModalContent
          ref='formContent'
          changeVideo={this.changeVideo}
          setFocus={this.focusTextElement}
          onChangeTitle={this.changeTitle}
          chooseLinkImage={this.chooseLinkImage}
          removeAttachment={this.removeAttachment}
          removeTextElement={this.removeTextElement}
          changeElementText={this.changeElementText}
          onChangeLink={this.onChangeLink}
          showTips={this.state.showTips}
          addAttachment={this.addAttachment}
          addImage={this.addImage}
          addPhoto={this.addPhoto}
          setTags={this.setTags}
          removePhoto={this.removePhoto}
          addDivider={this.addDivider}
          post={this.state.post}/>
        <PostModalFooter
          valid={this.validate(this.state.post)}
          close={this.hide}
          submit={this.submitForm}/>
      </div>
    </ReactBootstrap.Modal>
    );
  }
})

const PostModalFooter = React.createClass({
  render: function(){
    return (
      <ReactBootstrap.Modal.Footer>
        <button
          onClick={this.props.close}
          type='button'
          className='btn btn-default btn-st-inert'>
          Закрыть
        </button>
        <button
          onClick={this.props.submit}
          type='button'
          disabled={!this.props.valid}
          className='btn btn-primary btn-st'
          data-loading-text = 'Подождите...'>
          Опубликовать
        </button>
      </ReactBootstrap.Modal.Footer>
    );
  }
})

const PostModalAuthor = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    author: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      avatar: React.PropTypes.string.isRequired
    })
  },
  //END*****************************************************DECLARE
  render: function(){
    return (
      <div className = 'post-autor'>
        <div className='usual-avatar' style={{
          background: 'url('+ this.props.author.avatar +') no-repeat',
          'backgroundSize': 'cover'}}>
        </div>
        <div className = 'post-autor-info'>
          <div className = 'post-autor-name'>
            {this.props.author.name}
          </div>
          <div className = 'post-autor-type'>
            {this.props.author.type}
          </div>
        </div>
        <div className = 'action-angle'>
          <CitySelect onChange={this.props.onChange} city_name={this.props.city_name}/>
        </div>
      </div>
    );
  }
})

const FollowBox = React.createClass({
  getInitialState(){
    return {
      visible: true,
      users: this.props.users
    };
  },
  hide(){
    var selected_users = $.grep(this.state.users, function(user){
        return user.checked;
    })
    var selected_user_ids = selected_users.map(function(user) {
      return user.id;
    })
    console.log(selected_user_ids);
    this.setState({visible: false});
    $.ajax({
      url: this.props.path,
      //dataType: 'JSON',
      method: 'POST',
      data: {user_ids: selected_user_ids},
      cache: false,
      success: function(data) {
        //reload current page
        window.top.location = window.top.location;
      },
      error: function(xhr, status, err) {
        CE("PostModalForm::onChangeLink", xhr, status, err);
      }
    });
  },
  togleUser(user_id){
    users = this.state.users
    for(var i in users)
      if (users[i].id == user_id)
        users[i].checked = !users[i].checked;
    this.setState({users: users});
  },
  render(){
    var self = this;
    var checked_count = $.grep(this.state.users, function(user){
        return user.checked;
      }).length;
    disabled = checked_count < 5;
    var users_list = this.state.users.map(function(user){
      var button, disabled;
      if (user.checked) {
        button =(
          <button
            onClick={self.togleUser.bind(self, user.id)}
            className='btn btn-primary btn-st btn-reject-follow'>
            Не читать
          </button>
        );
      } else {
        button =(
          <button
            onClick={self.togleUser.bind(self, user.id)}
            className='btn btn-info btn-st btn-reject-follow'>
            Читать
          </button>
        );
      };
      return (
        <div key={user.id}>
          <div className="follower-user-button">
            <div className='follower-user'>
              <div className="preview-object">
                  <div className="preview-object-avatar" style={{
                    background: "url(" + user.avatar + ") no-repeat",
                    backgroundSize: 'cover'
                  }}>
                  </div>
                  <div className="preview-object-info">
                    <div className="object-text">
                      <div className="object-maintext">
                        {user.name}
                      </div>
                    </div>
                  </div>
              </div>
              <div className="clearboth">
              </div>
            </div>
            <div className = 'follower-button'>
              {button}
            </div>
          </div>
          <div className="clearboth">
          </div>
        </div>
      );
    });

    return (
      <ReactBootstrap.Modal
        dialogClassName='modal-dialog modal-dialog-follow-recommend'
        onHide={this.hide}
        backdrop='static'
        show={this.state.visible}>

      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">Читайте тех, кто Вам по душе!</h4>
        </div>
        <div className="modal-body">
          <div id="mywrapper">
            Мы отобрали для Вас самых интересных блогеров. Выберите для себя 5 наиболее понравившихся и начните читать их прямо сейчас!
          </div>
          <div className="usual-list border-b-radius">
            <div className= 'followers'>
              {users_list}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
          disabled={disabled}
          onClick={this.hide}
          className="btn btn-primary btn-st">Готово!</button>
        </div>
      </div>

      </ReactBootstrap.Modal>
    );
  }
})

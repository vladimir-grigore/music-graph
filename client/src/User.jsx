import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.logged_in) {
      return (
        <div className="loginBtn">
          <button className="btn btn-primary" id="btn-logout" onClick={this.props.loginUser}>Login</button>
        </div>
      )
    } else {
      return (
        <div className="logoutBtn">
          <button className="btn btn-primary" id="btn-login" onClick={this.props.logoutUser}>Logout</button>
        </div>
      )
    }
  }
}

export default User;

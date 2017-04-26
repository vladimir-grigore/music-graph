import React, {Component} from 'react';
import auth from './auth.js';

class User extends Component {
  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  loginUser(){
    auth.login_user().then(() => {
      localStorage.setItem('logged-in', 'true');
      this.props.loginUser();
    }).catch((err) => {
      console.error();
    });
  }

  logoutUser(){
    localStorage.removeItem('logged-in');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_image');
    localStorage.removeItem('access_token');
    this.props.logoutUser();
  }

  render() {
    if(!this.props.logged_in) {
      return (
        <div className="loginBtn">
          <button className="btn btn-primary" id="btn-logout" onClick={this.loginUser}>Login</button>
        </div>
      )
    } else {
      return (
        <div className="logoutBtn">
          <button className="btn btn-primary" id="btn-login" onClick={this.logoutUser}>Logout</button>
        </div>
      )
    }
  }
}

export default User;

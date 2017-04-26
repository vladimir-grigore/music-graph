import React, {Component} from 'react';
import auth from './auth.js';

class User extends Component {
  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(){
    auth.login_user();
  }

  render() {
    return (
      <div className="loginBtn">
        <button className="btn btn-primary" id="btn-login" onClick={this.loginUser}>Login</button>
        {/*<a href="/auth/spotify" className="btn btn-primary btn-sm">Log in with Spotify</a>*/}
      </div>
    )
  }
}

export default User;

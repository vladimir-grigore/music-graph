import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loginBtn">
        <a href="/login" className="btn btn-primary btn-sm">Log in with Spotify</a>
      </div>
    )
  }
}


export default User;

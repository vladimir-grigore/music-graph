import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user_image = localStorage.getItem('user_image');
    const user_name = localStorage.getItem('user_name');
    if(!this.props.logged_in) {
      return (
        <div className="userBtn">
          <button className="login" id="btn-logout" onClick={this.props.loginUser}>Login</button>
        </div>
      )
    } else {
      return (
        <div className="userBtn">
          <button className="logout" id="btn-login" onClick={this.props.logoutUser}>Logout</button>
          <img className="userImage" src={user_image} alt={user_name} />
          {/*<h2 className="userName">Welcome {user_name}!</h2>*/}
        </div>
      )
    }
  }
}

export default User;

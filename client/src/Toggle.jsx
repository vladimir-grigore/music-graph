import React, {Component} from 'react';

class Toggle extends Component {
  constructor(props){
    super(props);
  }
  // <a className ="handleToggle" href="#" onClick={this.handleClick.bind(this)}>Toggle</a>
// <span className="glyphicon glyphicon-align-justify"></span>
  render() {
    return (
      <div className="icon-bar">
        <a href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-caret-right"></i></a>
      </div>
    )
  }

  handleClick(event) {
    this.props.handleToggle();
  }
}

export default Toggle;

// const NavBar = ({userCount}) => {
//   return (
//     <nav className="navbar">
//       <a href="/" className="navbar-brand">Chatty</a>
//       <span className="userCount">{userCount} users Online</span>
//     </nav>
//   );
// }
// NavBar.propTypes = {
//   userCount: React.PropTypes.number
// };
// export default NavBar;
//
// const Toggle = ({}) => {
//   return (
//
//   )
//   constructor(props){
//     super(props);
//   }
//   // <a className ="handleToggle" href="#" onClick={this.handleClick.bind(this)}>Toggle</a>
// // <span className="glyphicon glyphicon-align-justify"></span>
//   render() {
//     return (
//       <div className="icon-bar">
//         <a href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-caret-right"></i></a>
//       </div>
//     )
//   }
//
//   handleClick(event) {
//     this.props.handleToggle();
//   }
//   Toggle.propTypes = {
//     : React.PropTypes.
//   }
// }
//
// export default Toggle;

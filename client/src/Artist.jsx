import React, {Component} from 'react';
import Albums from './Albums.jsx';

class Artist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const albums = Object.keys(this.props.albums)
    .map(item => <Albums key={item} value={this.props.albums[item].name} tracks={this.props.albums[item].tracks} />);
    return (
      <li className="list__item">
        {this.props.value}
        <ul>
          {albums}
        </ul>
      </li>
    )
  }
}

export default Artist;

//
// import React, {Component} from 'react';
// import {ListGroup, ListGroupItem, CustomComponent} from 'react-bootstrap';
//
// class Artist extends Component {
//   constructor(props) {
//     super(props);
//   }
//   alertClicked() {
//     alert('You clicked the third ListGroupItem');
//   }
//   const CustomComponent = React.createClass({
//   render() {
//     return (
//       <li
//         className="list-group-item"
//         onClick={() => {}}>
//         {this.props.children}
//       </li>
//     );
//   }
// });
//   render() {
//     return (
//       <ListGroup>
//         <ListGroupItem href="#link1" active>{this.props.value}</ListGroupItem>
//       </ListGroup>
//     )
//   }
// }
//
// export default Artist;
// // <ListGroupItem onClick={this.alertClicked.bind(this)}></ListGroupItem>

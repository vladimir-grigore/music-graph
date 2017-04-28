import React, {Component} from 'react';

class Tracks extends Component {
  constructor(props) {
    super(props);
  }
  trackClick = (id) => {
    console.log('in tracks id: ', this.props.id);
  }
  render() {
    return (
      <li onClick={this.trackClick}>
        {this.props.value}
      </li>
    )
  }
}

export default Tracks;

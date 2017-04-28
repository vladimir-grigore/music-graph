import React, {Component} from 'react';

class Tracks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        {this.props.value}
      </li>
    )
  }
}

export default Tracks;

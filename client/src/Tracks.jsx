import React, {Component} from 'react';

class Tracks extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.trackMenuClick(this.props.id);
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        {this.props.value}
      </li>
    )
  }
}

export default Tracks;

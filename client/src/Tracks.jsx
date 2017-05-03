import React, {Component} from 'react';

class Tracks extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.trackMenuClick(this.props.artistID, this.props.albumID, this.props.id);
  }

  render() {
    return (
      <li className="list__tracks" onClick={this.handleClick}>
        {this.props.value}
      </li>
    )
  }
}

export default Tracks;

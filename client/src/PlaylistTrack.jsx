import React, {Component} from 'react';

class PlaylistTrack extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.trackClick(this.props.id);
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        {this.props.value}
      </li>
    )
  }
}

export default PlaylistTrack;
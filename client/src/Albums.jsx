import React, {Component} from 'react';
import Tracks from './Tracks.jsx';

class Albums extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tracks = Object.keys(this.props.tracks)
      .map(item => <Tracks key={item} value={this.props.tracks[item].name} />);
    return (
      <li>
        {this.props.value}
        {tracks}
      </li>
    )
  }
}

export default Albums;

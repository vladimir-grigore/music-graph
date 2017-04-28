import React, {Component} from 'react';
import Tracks from './Tracks.jsx';

class Albums extends Component {
  constructor(props) {
    super(props);
    // this.cl = this.cl.bind(this);
  }
  // cl(){
  //   return `darken(${this.props.color}, 50%)`
  // }
  render() {
    const tracks = Object.keys(this.props.tracks)
      .map(item => <Tracks key={item} value={this.props.tracks[item].name} />);
    return (
      <li style={{color: this.props.color}}>
        {this.props.value}
        <ul>
          {tracks}
        </ul>
      </li>
    )
  }
}

export default Albums;

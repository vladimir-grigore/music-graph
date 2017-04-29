import React, {Component} from 'react';
import Tracks from './Tracks.jsx';

class Albums extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.albumMenuClick(this.props.id);
  }

  render() {
    const tracks = Object.keys(this.props.tracks)
      .map(item => <Tracks key={item} 
                           id={item} 
                           value={this.props.tracks[item].name}
                           trackMenuClick={this.props.trackMenuClick}
                           />);
    return (
      <li style={{color: this.props.color}} onClick={this.handleClick}>
        {this.props.value}
        <ul>
          {tracks}
        </ul>
      </li>
    )
  }
}

export default Albums;

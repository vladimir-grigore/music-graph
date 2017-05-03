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
                           artistID={this.props.artistID}
                           albumID={this.props.id}
                           value={this.props.tracks[item].name}
                           trackMenuClick={this.props.trackMenuClick}
                           />);
    return (
      <div style={{color: this.props.color}} onClick={this.handleClick}>
        {this.props.value}
        <ul>
          {tracks}
        </ul>
      </div>
    )
  }
}

export default Albums;

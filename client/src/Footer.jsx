import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if(Object.keys(this.props.song).length !== 0){
      return (
        <div className="footer-div">
          <div className="artistName">{this.props.song.artistName}</div>
          <div className="trackName">{this.props.song.trackName}</div>
          <img className="albumImage" src={this.props.song.albumCover} alt="album-cover" />
          <ReactAudioPlayer src={this.props.song.trackUrl} autoPlay />
        </div>
      )
    } else {
      return (
        <div className="footer-div">
          {/*Used when no track is playing*/}
        </div>
      )
    }
  }
}

export default Footer;

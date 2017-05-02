import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const albumIMG = this.props.song.albumCover;
    if(Object.keys(this.props.song).length !== 0){
      return (
        <div className="footer-div footer-playing">
          <h3 className="artistName">{this.props.song.artistName}</h3>
          {/*<h4 className="trackName">{this.props.song.trackName}</h4>*/}
          <img className="albumImage" src={this.props.song.albumCover} alt="album-cover" />
          <ReactAudioPlayer className="audioPlayer" src={this.props.song.trackUrl} autoPlay />
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

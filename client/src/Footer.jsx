import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';
const path = require('path');

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const SpotifyLogo = path.resolve(__dirname, '/img/SpotifyLogo_t.png');
    const JamBaseLogo = path.resolve(__dirname, '/img/JamBaseLogo_t.png');
    const VisJsLogo = path.resolve(__dirname, '/img/VisJsLogo_t.png');
    if(Object.keys(this.props.song).length !== 0){
      const albumIMG = this.props.song.albumCover;
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
        <div className="footer-div logos">
          <div className="powered-by">Powered by</div>
          <img src={SpotifyLogo} className="spotify-logo" alt="spotify-logo"/>
          <img src={JamBaseLogo} className="jambase-logo" alt="jambase-logo"/>
          <img src={VisJsLogo} className="visjs-logo" alt="visjs-logo"/>
        </div>
      )
    }
  }
}

export default Footer;

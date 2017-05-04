import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import path from 'path';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const SpotifyLogo = path.resolve(__dirname, '/img/SpotifyLogo_t.png');
    const JamBaseLogo = path.resolve(__dirname, '/img/JamBaseLogo_t.png');
    const VisJsLogo = path.resolve(__dirname, '/img/VisJsLogo_t.png');
    const ReactLogo = path.resolve(__dirname, '/img/ReactLogo.png');
    const NodeLogo = path.resolve(__dirname, '/img/NodeLogo.png');
    const vignette = path.resolve(__dirname, '/img/vignette.png');
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
          <a href="https://www.spotify.com/"><img src={SpotifyLogo} className="spotify-logo" alt="spotify-logo"/></a>
          <a href="http://www.jambase.com"><img src={JamBaseLogo} className="jambase-logo" alt="jambase-logo"/></a>
          <a href="http://visjs.org/"><img src={VisJsLogo} className="visjs-logo" alt="visjs-logo"/></a>
          <a href="https://reactjs.net/"><img src={ReactLogo} className="reactjs-logo" alt="reactjs-logo"/></a>
          <a href="https://nodejs.org/en/"><img src={NodeLogo} className="nodejs-logo" alt="nodejs-logo"/></a>
          <img src={vignette} className="footer-vignette" alt="vignette"/>
        </div>
      )
    }
  }
}

export default Footer;

import React, {Component} from 'react';
import SideMenu from './SideMenu.jsx';
import Toggle from './Toggle.jsx';
import SpotifyAPI from './spotify_web_api.js';
import Visualizer from './visualizer.js';

const spotify_API = new SpotifyAPI();
const network = document.getElementById('network');
const visualizer = new Visualizer(network);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
    this.lookUpArtist = this.lookUpArtist.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  async lookUpArtist(artistName){
    // Reset the folder structure
    visualizer.artistStructure = {};
    // Update visualizer canvas
    visualizer.clear();

    // Search for an artist, display all results
    const artists = await spotify_API.search_artists(artistName);
    for( {id, name, image, popularity } of artists) {
      visualizer.toggleArtistNode(id, name, image, popularity);
    }
  }

  handleToggle(yes){
    if (this.state.open){
      this.setState({ open : false})
    } else {
      this.setState({ open : true})
    }
  }

  render() {
    if (this.state.open) {
      return (
        <div>
          <SideMenu visualizer={visualizer} lookUpArtist={this.lookUpArtist}/>
          <Toggle handleToggle={this.handleToggle} />
        </div>
      )
    } else {
      return (
        <div>
          <Toggle handleToggle={this.handleToggle} />
        </div>
      )
    }
  }
}

export default App;

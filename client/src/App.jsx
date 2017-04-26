import React, {Component} from 'react';
import SideMenu from './SideMenu.jsx';
import SpotifyAPI from './spotify_web_api.js';
import Visualizer from './visualizer.js';
import User from './User.jsx';

const spotify_API = new SpotifyAPI();
const network = document.getElementById('network');
const visualizer = new Visualizer(network);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: {}
    }
    this.lookUpArtist = this.lookUpArtist.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.extractNames = this.extractNames.bind(this);
    visualizer.updateCallback = this.handleUpdate;
  }

  extractNames(obj){
    this.setState({ artists: obj })
  }

  handleUpdate(event){
    this.extractNames(visualizer.getFolderStructure());
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
    this.handleUpdate();
  }
  //
  // handleToggle(){
  //   if (this.state.open){
  //     this.setState({ open : false})
  //   } else {
  //     this.setState({ open : true})
  //   }
  // }

  render() {
      return (
        <div>
          <User />
          <SideMenu data={this.state.artists} lookUpArtist={this.lookUpArtist} />
        </div>
      )
  }
}

export default App;

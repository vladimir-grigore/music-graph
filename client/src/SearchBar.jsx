import React, {Component} from 'react';
import Visualizer from'./visualizer.js';
import SpotifyAPI from'./spotify_web_api.js';

const network = document.getElementById('network');
const visualizer = new Visualizer(network);
const spotify_API = new SpotifyAPI();

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.lookUpArtist = this.lookUpArtist.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    // Component will react to any click - will be moved to a specific 
    // tree visualizer component
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      value: ''
    }
  }
  
  ////////////////////////////////////////////////
  handleUpdate(){
    var nodes = visualizer.getFolderStructure();
    console.log(nodes);
    // this.setState({value: 'YAY'});
  }

  componentDidMount(){
    window.addEventListener("click", this.handleUpdate, false);
  }

  componentWillUnmount(){
    window.removeEventListener("click", this.handleUpdate);
  }
  ////////////////////////////////////////////////

  // onKeyPress is used to listen for Enter keypress
  async lookUpArtist(event){
    if(event.key == 'Enter'){
      // Reset the folder structure
      visualizer.artistStructure = {};
      // Update visualizer canvas
      visualizer.clear();

      // Search for an artist, display all results
      const artists = await spotify_API.search_artists(this.state.value);
      for( {id, name, image, popularity } of artists) {
        visualizer.artistStructure[id] = { name , albums: {} };
        visualizer.toggleArtistNode(id, name, image, popularity);
      }
      this.setState({value: ''});
    }
  }

  // Text from the input field is stored in this.state.value
  handleKeyDown(event){
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <input
          id="search-form"
          className='artist-lookup'
          placeholder="search artist"
          value={this.state.value}
          onKeyPress={this.lookUpArtist}
          onChange={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default SearchBar;

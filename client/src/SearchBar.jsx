import React, {Component} from 'react';
import Visualizer from'./visualizer.js';
import SpotifyAPI from'./spotify_web_api.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.lookUpArtist = this.lookUpArtist.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      value: ''
    }
  }

  // onKeyPress is used to listen for Enter keypress
  async lookUpArtist(event){
    if(event.key == 'Enter'){
      // Update visualizer canvas
      const spotify_API = new SpotifyAPI();
      const network = document.getElementById('network');
      const visualizer = new Visualizer(network);
      visualizer.clear();

      // Search for an artist, display all results
      const artists = await spotify_API.search_artists(this.state.value);
      for( {id, name, image, popularity } of artists) {
        visualizer.addArtistNode(id, name, image, popularity);
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
        <h2>Search for an Artist</h2>
        <input className='artist-lookup'
        value={this.state.value}
        placeholder="search artist" onKeyPress={this.lookUpArtist} onChange={this.handleKeyDown}/>
      </div>
    );
  }
}

export default SearchBar;

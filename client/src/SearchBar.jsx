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
      for( {id, name } of artists) {
        visualizer.addArtistNode(id, name);
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

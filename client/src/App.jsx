import React, {Component} from 'react';
import SideMenu from './SideMenu.jsx';
import Toggle from './Toggle.jsx';
import SpotifyAPI from './spotify_web_api.js';
import Visualizer from './visualizer.js';
import User from './User.jsx';

const spotify_API = new SpotifyAPI();
const network = document.getElementById('network');
const visualizer = new Visualizer(network, spotify_API);

class App extends Component {
  constructor(props) {
    super(props);
    const logged_in = localStorage.getItem('logged-in');
    this.state = {
      open: true,
      artists: {}, 
      logged_in
    }

    this.lookUpArtist = this.lookUpArtist.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.extractNames = this.extractNames.bind(this);
    this.addSpotifyAuthToken = this.addSpotifyAuthToken.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
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

    ///////////////////////PLAYLISTS///////////////////////////
    // if(this.state.logged_in) {
    //   this.addSpotifyAuthToken();
    //   // const user = await spotify_API.get_current_user();
    //   // console.log("-----USER------", user);
    //   const playlists = await spotify_API.get_user_playlists('22kychmuozobpxyvt7upchy3q');
    //   console.log("PLAYLISTS", playlists);

    //   const playlist1 = await spotify_API.get_playlist('22kychmuozobpxyvt7upchy3q', '0Q8pydgbbdun0Iuvxq7BVH');
    //   console.log("PLAYLIST1:", playlist1);
    // }
    ///////////////////////PLAYLISTS///////////////////////////

    for( {id, name, image, popularity } of artists) {
      visualizer.toggleArtistNode(id, name, image, popularity);
    }
    this.handleUpdate();
  }

  addSpotifyAuthToken() {
    const token = localStorage.getItem('access_token');
    spotify_API.set_api_token(token);
  }

  logoutUser(){
    this.setState({ logged_in: false });
  }

  loginUser(){
    this.addSpotifyAuthToken();
    this.setState({ logged_in: true });
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
          <User logged_in={this.state.logged_in} 
                loginUser={this.loginUser}
                logoutUser={this.logoutUser}
                />
          <SideMenu data={this.state.artists} lookUpArtist={this.lookUpArtist} />
          <Toggle handleToggle={this.handleToggle} />
        </div>
      )
    } else {
      return (
        <div>
          <User logged_in={this.state.logged_in}
                loginUser={this.loginUser}
                logoutUser={this.logoutUser}
                />
          <Toggle handleToggle={this.handleToggle} />
        </div>
      )
    }
  }
}

export default App;

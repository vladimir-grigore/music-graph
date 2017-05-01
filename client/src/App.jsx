import React, {Component} from 'react';
import SideMenu from './SideMenu.jsx';
import SpotifyAPI from './spotify_web_api.js';
import Visualizer from './visualizer.js';
import Footer from './Footer.jsx'
import User from './User.jsx';
import Toggle from './Toggle.jsx';
import auth from './auth.js';

const spotify_API = new SpotifyAPI();
const network = document.getElementById('network');
const visualizer = new Visualizer(network, spotify_API);

class App extends Component {
  constructor(props) {
    super(props);
    const logged_in = localStorage.getItem('logged-in');
    this.state = {
      open: 'open',
      artists: {},
      logged_in
    }
    visualizer.updateCallback = this.handleUpdate;
  }

  // Keep the artist/album/tracks strucutre as a component state
  handleUpdate = async () => {
    const folderStructure = await visualizer.getFolderStructure();
    this.setState({ artists: folderStructure });
  }

  // Handles the artists clicks on the side bar
  artistMenuClick = async (id) => {
    await visualizer.handleArtistClick(id);
    await this.handleUpdate();
  }

  // Handles the albums clicks on the side bar
  albumMenuClick = async (id) => {
    await visualizer.handleAlbumClick(id);
    await this.handleUpdate();
  }

  // Handles the track clicks on the side bar
  trackMenuClick = (id) => {
    console.log("You clicked a track", id);
  }

  // Search Spotify API for artist name and populte vis.js canvas
  lookUpArtist = async (artistName) => {
    // Reset the folder structure
    visualizer.artistStructure = {};
    // Update visualizer canvas
    visualizer.clear();
    // Search for an artist, display all results
    const artists = await spotify_API.search_artists(artistName);

    // Populate canvas with artist nodes
    for( {id, name, image, popularity } of artists) {
      visualizer.toggleArtistNode(id, name, image, popularity);
    }
    await this.handleUpdate();
  }

  handleToggle = (parentNode) => {
    if (parentNode == 'open'){
      this.setState({ open : 'closed'});
    } else {
      this.setState({ open : 'open'});
    }
  }

  // Spotify OAuth, setting user details in local storage
  loginUser = async () => {
    auth.login_user().then(() => {
      localStorage.setItem('logged-in', 'true');
      this.setState({ logged_in: true });
    }).catch((err) => {
      console.error();
    });
  }

  // Clear user info from local storage and refreh component state
  logoutUser = async () => {
    localStorage.removeItem('logged-in');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_image');
    localStorage.removeItem('access_token');
    this.setState({ logged_in: false });
  }

  render() {
    if (this.state.open == 'open') {
      return (
        <div id="wrapper">
          <User loginUser={this.loginUser}
                logoutUser={this.logoutUser}
                logged_in={this.state.logged_in}
                />
          <SideMenu data={this.state.artists}
                    artistMenuClick={this.artistMenuClick}
                    albumMenuClick={this.albumMenuClick}
                    trackMenuClick={this.trackMenuClick}
                    lookUpArtist={this.lookUpArtist}/>
          <Toggle className={this.state.open} handleToggle={this.handleToggle} />
        </div>
      )
    } else {
      return (
        <div>
          <User logged_in={this.state.logged_in}
                loginUser={this.loginUser}
                logoutUser={this.logoutUser}
                />
          <Toggle className={this.state.open} handleToggle={this.handleToggle} />
        </div>
      )
    }
  }
}

export default App;

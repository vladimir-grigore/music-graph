import React, {Component} from 'react';
import SideMenu from './SideMenu.jsx';
import SpotifyAPI from './spotify_web_api.js';
import Visualizer from './visualizer.js';
import User from './User.jsx';
import Toggle from './Toggle.jsx';
import auth from './auth.js';
import events from './events.js';

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
    this.handleToggle = this.handleToggle.bind(this);
    this.lookUpArtist = this.lookUpArtist.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addSpotifyAuthToken = this.addSpotifyAuthToken.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    visualizer.updateCallback = this.handleUpdate;
  }

  // Keep the artist/album/tracks strucutre as a component state
  handleUpdate(event){
    const folderStructure = visualizer.getFolderStructure();
    this.setState({ artists: folderStructure });
  }

  artistMenuClick = (id) => {
    console.log("You clicked an artist", id);
  }

  albumMenuClick = (id) => {
    console.log("You clicked an album", id);
  }

  trackMenuClick = (id) => {
    console.log("You clicked a track", id);
  }


  // Search Spotify API for artist name and populte vis.js canvas
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
    //   const user = await spotify_API.get_current_user();
    //   if(user === 401 || user === 403) {
    //     this.loginUser();
    //   } else {
    //     console.log("-----USER------", user);
    //   }
    //   const playlists = await spotify_API.get_user_playlists('22kychmuozobpxyvt7upchy3q');
    //   console.log("PLAYLISTS", playlists);
    //   const playlist1 = await spotify_API.get_playlist('22kychmuozobpxyvt7upchy3q', '0Q8pydgbbdun0Iuvxq7BVH');
    //   console.log("PLAYLIST1:", playlist1);
    // }
    ///////////////////////PLAYLISTS///////////////////////////

    ///////////////////////EVENTS API//////////////////////////
    // events.get_artist_by_name(artistName);
    // events.get_venue_by_name("Commodore");
    // events.get_events_by_artist_id(31754);
    // events.get_events_by_venue_id(3816);
    // events.get_events_by_artist_id_start_end_date(31754, '2017-05-01', '2017-08-30');
    // events.get_events_by_venue_id_start_end_date(3816, '2017-05-01', '2017-08-30');
    ///////////////////////EVENTS API//////////////////////////

    // Populate canvas with artist nodes
    for( {id, name, image, popularity } of artists) {
      visualizer.toggleArtistNode(id, name, image, popularity);
    }
    this.handleUpdate();
  }

  handleToggle(parentNode){
    if (parentNode == 'open'){
      this.setState({ open : 'closed'});
    } else {
      this.setState({ open : 'open'});
    }
  }

  // Set Spotify API authentication token
  // Used in getting user info and playlists details
  addSpotifyAuthToken() {
    const token = localStorage.getItem('access_token');
    spotify_API.set_api_token(token);
  }

  // Spotify OAuth, setting user details in local storage
  loginUser(){
    auth.login_user().then(() => {
      localStorage.setItem('logged-in', 'true');
      this.addSpotifyAuthToken();
      this.setState({ logged_in: true });
    }).catch((err) => {
      console.error();
    });
  }

  logoutUser(){
    localStorage.removeItem('logged-in');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_image');
    localStorage.removeItem('access_token');
    this.setState({ logged_in: false });
  }

  // handleEventClick = (event) => {
  //   console.log('hi');
  // }

  render() {
    if (this.state.open == 'open') {
      return (
        <div id="wrapper">
          <User logged_in={this.state.logged_in}
                loginUser={this.loginUser}
                logoutUser={this.logoutUser}
                />
          <SideMenu data={this.state.artists} 
                    artistMenuClick={this.artistMenuClick} 
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

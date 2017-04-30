import React, {Component} from 'react';
import SpotifyAPI from './spotify_web_api.js';
import PlaylistTrack from './PlaylistTrack.jsx';
const spotify_API = new SpotifyAPI();

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
  }

  addPlaylistsToState = async () => {
    let playlistsArray = [];
    const playlists = await this.getPlaylist();
    // Check to see if the session is still alive
    if(playlists !== 'token_expired') {
      playlists.items.map(playlist => {
        let playlistObject = {};
        playlistObject = {id: playlist.id, name: playlist.name, tracks: {}}
        playlistsArray.push(playlistObject);
      })
      this.setState({ playlists: playlistsArray });
    } else {
      this.setState({ playlists });
    }
  }

  // Try to populate the playlists panel
  componentWillMount = async () => {
    if(localStorage.getItem('logged-in')){
      this.addPlaylistsToState();
    }
  }

  // Used when a user with an expired token logs back in
  componentWillReceiveProps = async () => {
    if(localStorage.getItem('logged-in')){
      this.addPlaylistsToState();
    }
  }

  // Set Spotify API authentication token
  // Used in getting user info and playlists details
  addSpotifyAuthToken = () => {
    const token = localStorage.getItem('access_token');
    spotify_API.set_api_token(token);
  }

  // Try to authenticat with existing token
  getPlaylist = async () => {
    if(localStorage.getItem('logged-in')) {
      this.addSpotifyAuthToken();
      const user = await spotify_API.get_current_user();
      if(user === 401 || user === 403) {
        return 'token_expired';
      }
      const playlists = await spotify_API.get_user_playlists(localStorage.getItem('user_id'));
      return playlists;
    }
  }

  clickPlaylist = async (id) => {
    console.log("You clicked a playlist", id);
  }

  render() {
    // Display message for visitors
    if(!localStorage.getItem('logged-in')){
      return (
        <li className="playlists">
          Please Log in
        </li>
      )
    } else if(this.state.playlists === 'token_expired') { 
      // Auth tokens expire after 60 min, users remain logged in
      return (
        <li className="playlists">
          Your session has expired
        </li>
      )
    } else {
      // Wait for the API call to resolve before displaying data
      if(this.state.playlists.length !== 0){
        const playlist = this.state.playlists.map(playlistItem => 
          <Playlist key={playlistItem.id} id={playlistItem.id} name={playlistItem.name} handleClick={this.clickPlaylist} />
        );
        return (
          <li className="playlists">
            Playlists:
            {playlist}
          </li>
        )
      } else {
        // Will be triggered while API calls are still running
        return null;
      }
    }
  }
}

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.handleClick(this.props.id);
  }

  render() {
    return (
      <ul>
        <li onClick={this.handleClick}>
          {this.props.name}
          <ul>
            {/*{playlistTrack}*/}
          </ul>
        </li>
      </ul>
    )
  }
}

export default Playlists;

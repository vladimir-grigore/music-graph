import React, {Component} from 'react';
import SpotifyAPI from './spotify_web_api.js';
const spotify_API = new SpotifyAPI();

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: {}
    }
  }

  // Try to populate the playlists panel
  componentWillMount = async () => {
    if(localStorage.getItem('logged-in')){
      const playlists = await this.getPlaylist();
      this.setState({ playlists });
    }
  }

  // Used when a user with an expired token logs back in
  componentWillReceiveProps = async () => {
    if(localStorage.getItem('logged-in')){
      const playlists = await this.getPlaylist();
      this.setState({ playlists });
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
      if(Object.keys(this.state.playlists).length !== 0){
        const playlist = this.state.playlists.items.map(playlistItem => {
          return (
            <ul key={playlistItem.id} id={playlistItem.id}>
              <li>
                {playlistItem.name}
              </li>
            </ul>
          )
        });
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

export default Playlists;

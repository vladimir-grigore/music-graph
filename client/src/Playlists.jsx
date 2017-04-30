import React, {Component} from 'react';
import SpotifyAPI from './spotify_web_api.js';
import PlaylistTrack from './PlaylistTrack.jsx';
const spotify_API = new SpotifyAPI();

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: {}
    }
  }

  addPlaylistsToState = async () => {
    const playlistResults = await this.getPlaylist();
    // Check to see if the session is still alive
    if(playlistResults === 'token_expired') {
      this.setState({ playlists: playlistResults });
    } else {
      let playlists = {};
      playlistResults.items.map(playlist => {
        playlists[playlist.id] = { name: playlist.name, tracks: {} };
      });
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

  // Expand the tracks for a certain playlist
  clickPlaylist = async (id) => {
    const playlistTracks = await spotify_API.get_playlist(localStorage.getItem('user_id'), id);
    let playlists = this.state.playlists;
    playlistTracks.tracks.items.map(trackEntry => {
      playlists[id].tracks[trackEntry.track.id] = { name: trackEntry.track.name, url: trackEntry.track.preview_url };
    })
    this.setState({ playlists });
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
        const playlist = Object.keys(this.state.playlists).map(playlistItem =>
          <Playlist key={playlistItem}
                    id={playlistItem} 
                    name={this.state.playlists[playlistItem].name} 
                    handleClick={this.clickPlaylist}
                    tracks={this.state.playlists[playlistItem].tracks} 
                    />
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
    // console.log("*", this.props.tracks)
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

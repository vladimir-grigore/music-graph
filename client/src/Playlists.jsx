import React, {Component} from 'react';
import SpotifyAPI from './spotify_web_api.js';
import SearchBar from './SearchBar.jsx';
import Footer from './Footer.jsx';
const spotify_API = new SpotifyAPI();

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: {},
      song: {}
    }
    this.playlistColor = 0;
  }

  // Returns a random color to be used for track nodes
  randomColor = () => {
    const colorArray = [ '#7CBF7F', '#6584C7', '#DC4B7C', '#8D65E0' ];
    if (this.playlistColor === colorArray.length) {
      this.playlistColor = 0;
    }
    let color =  colorArray[this.playlistColor];
    this.playlistColor += 1;
    return color;
  }

  // Try to populate the list of playlists or return a session expired message
  addPlaylistsToMenu = async () => {
    const playlistResults = await this.getPlaylist();
    // Check to see if the session is still alive
    if(playlistResults === 'token_expired') {
      this.setState({ playlists: playlistResults });
    } else {
      let playlists = {};
      playlistResults.items.map(playlist => {
        playlists[playlist.id] = { name: playlist.name, tracks: {}, color: '' };
      });
      this.setState({ playlists });
    }
  }

  // Try to populate the playlists panel
  componentWillMount = async () => {
    if(localStorage.getItem('logged-in')){
      this.addPlaylistsToMenu();
    }
  }

  // Used when a user with an expired token logs back in
  componentWillReceiveProps = async () => {
    if(localStorage.getItem('logged-in')){
      this.addPlaylistsToMenu();
    }
  }

  // Try to authenticat with existing token
  getPlaylist = async () => {
    if(localStorage.getItem('logged-in')) {
      // this.addSpotifyAuthToken();
      const user = await spotify_API.get_current_user();
      if(user === 401 || user === 403) {
        return 'token_expired';
      }
      const playlists = await spotify_API.get_user_playlists(localStorage.getItem('user_id'));
      return playlists;
    }
  }

  // Expand the tracks for a certain playlist
  playlistMenuClick = async (id) => {
    let playlists = this.state.playlists;
    // Toggle tracks on and off when clicking on a playlist
    if(Object.keys(playlists[id].tracks).length === 0) {
      let color = this.randomColor();
      let playlistTracks = await spotify_API.get_playlist(localStorage.getItem('user_id'), id);
      playlistTracks.tracks.items.map(trackEntry => {
        playlists[id].tracks[trackEntry.track.id] = { name: trackEntry.track.name, url: trackEntry.track.preview_url };
        playlists[id].color = color;
      });
      this.setState({ playlists });
    } else {
      playlists[id].tracks = {};
      playlists[id].color = '';
      this.setState({ playlists, song: {} });
    }
  }

  // Handle clicks on each track
  trackMenuClick = async (trackId) => {
    let data = await spotify_API.get_track(trackId);
    console.log("track", data)
    const albumCover = data.tracks[0].album.images[0].url;
    const artistName = data.tracks[0].artists[0].name;
    const trackUrl = data.tracks[0].preview_url;
    const trackName = data.tracks[0].name;
    this.setState({ song: {artistName, trackName, albumCover, trackUrl} });
  }

  // Filter playlists by name. An empty search will return all playlists
  handleSearch = (input) => {
    if(input === ''){
      this.addPlaylistsToMenu();
    }
    let playlists = this.state.playlists;
    Object.keys(playlists).map(item => {
      let playlistName = Object.values(playlists[item])[0].toLowerCase();
      if(!playlistName.includes(input.toLowerCase())) {
        // Remove playlusts if they are not found in the search
        delete playlists[item];
      }
    });
    this.setState({ playlists });
  }

  render() {
    // Display message for visitors
    if(!localStorage.getItem('logged-in')){
      return (
        <div>
          <div className="playlists">
            <SearchBar placeholder="Search playlist..." handleSearch={this.handleSearch} />
            <h1>Please log in</h1>
          </div>
          <Footer song={this.state.song} />
        </div>
      )
    } else if(this.state.playlists === 'token_expired') {
      // Auth tokens expire after 60 min, users remain logged in
      return (
        <div>
          <div className="playlists">
            <SearchBar placeholder="Search playlist..." handleSearch={this.handleSearch} />
            <h1>Your session has expired!</h1>
          </div>
          <Footer song={this.state.song} />
        </div>
      )
    } else {
      // Wait for the API call to resolve before displaying data
      if(this.state.playlists.length !== 0){
        const playlist = Object.keys(this.state.playlists).map(playlistItem =>
          <Playlist key={playlistItem}
                    id={playlistItem}
                    name={this.state.playlists[playlistItem].name}
                    playlistMenuClick={this.playlistMenuClick}
                    trackMenuClick={this.trackMenuClick}
                    tracks={this.state.playlists[playlistItem].tracks}
                    color={this.state.playlists[playlistItem].color}
                    />);
        return (
          <div>
            <div className="playlists">
              <SearchBar placeholder="Search playlist..." handleSearch={this.handleSearch} />
              <h1>Playlists:</h1>
              {playlist}
            </div>
            <Footer song={this.state.song} />
          </div>
        )
      } else {
        // Will be triggered while API calls are still running
        <div>
          <div className="playlists">
            <SearchBar placeholder="Search playlist..." />
            Playlists:
          </div>
          <Footer song={this.state.song} />
        </div>
      }
    }
  }
}

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  playlistMenuClick = (e) => {
    e.stopPropagation();
    this.props.playlistMenuClick(this.props.id);
  }

  render() {
    const playlistTrack = Object.keys(this.props.tracks).map(item =>
      <PlaylistTrack key={item}
                     id={item}
                     value={this.props.tracks[item].name}
                     trackMenuClick={this.props.trackMenuClick}
                     />);
    return (
      <div className="list__playlists">
        <div style={{color: this.props.color}} onClick={this.playlistMenuClick}>
          {this.props.name}
          <ul>
            {playlistTrack}
          </ul>
        </div>
      </div>
    )
  }
}

class PlaylistTrack extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.trackMenuClick(this.props.id);
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        {this.props.value}
      </li>
    )
  }
}

export default Playlists;

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

  async componentWillMount(){
    if(localStorage.getItem('logged-in')){
      const playlists = await this.getPlaylist();
      this.setState({ playlists });
    }
  }

  async componentWillReceiveProps(){
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
    if(!localStorage.getItem('logged-in')){
      return <h2> Please Log in </h2>
    } else if(this.state.playlists === 'token_expired') {
      return <h2> Your session has expired </h2>
    } else {
      const playlist = () => {
        const playlistName = [];
        for (let i in this.state.playlists.items){
          playlistName.push({id: this.state.playlists.items[i].id, name: this.state.playlists.items[i].name});
        }
        return playlistName;
      }
      return (
        <ul className="playlists">
          <h1>Playlists: </h1>
          {playlist().map(e => {
            return (
              <li key={e.id} id={e.id}>
                {e.name}
              </li>
            )
          })}
        </ul>
      )
    }
  }
}

export default Playlists;

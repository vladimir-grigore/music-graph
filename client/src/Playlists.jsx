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
      return (
        <li className="playlists">
          Please Log in
        </li>
      )
    } else if(this.state.playlists === 'token_expired') {
      return (
        <li className="playlists">
          Your session has expired
        </li>
      )
    } else {
      const playlist = () => {
        const playlistName = [];
        for (let i in this.state.playlists.items){
          playlistName.push({id: this.state.playlists.items[i].id, name: this.state.playlists.items[i].name});
        }
        return playlistName;
      }
      return (
        <li className="playlists">
          Playlists:
          {playlist().map(e => {
            return (
              <ul key={e.id} id={e.id}>
                <li>
                  {e.name}
                </li>
              </ul>
            )
          })}
        </li>
      )
    }
  }
}

export default Playlists;

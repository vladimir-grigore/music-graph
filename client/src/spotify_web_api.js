import SpotifyWebApi from 'spotify-web-api-node';
import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';
import path from 'path';

class SpotifyAPI {
  constructor(){
    this.api = new SpotifyWebApi({});
    this.apiFallback = restful('https://api.spotify.com/v1', fetchBackend(fetch));
  }

  set_api_token = (token) => {
    this.api.setAccessToken(token);
  }
  
  search_artists = async function(name) {
    const MissingArtistImage = path.resolve(__dirname, '/img/MissingCover.png');
    let auth_token = localStorage.getItem('access_token');
    this.apiFallback.header('Accept', 'application/json');
    this.apiFallback.header('Authorization', `Bearer ${auth_token}`);
    const url = this.apiFallback.custom(`search?q=${name}&type=artist`);
    
    try{
      let data = await url.get();
      const artists = [];
      const MissingArtistImage = path.resolve(__dirname, '/img/MissingCover.png');
      // Filter artist by popularity
      data.body().data().artists.items.forEach(function(item){
        if (item.popularity > 0) {
          artists.push(item);
        }
      });

      return artists.map(item => ({ 
        id: item.id, 
        name: item.name, 
        image: item.images.length > 0 ? item.images[item.images.length - 1].url : MissingArtistImage,
        popularity: item.popularity
      }));
    } catch(err) {
      return err.statusCode;
    }
  }
  
  get_albums_for_artist = async function(artistID) {
    try {
      let auth_token = localStorage.getItem('access_token');
      this.apiFallback.header('Accept', 'application/json');
      this.apiFallback.header('Authorization', `Bearer ${auth_token}`);
      const artist_url = this.apiFallback.custom(`artists/${artistID}/albums?market=US&limit=20`);
      let artist_data = await artist_url.get();
      
      if(artist_data.body().data().items.length > 0){
        const ids = artist_data.body().data().items.map(x => x.id).join();
        const albums_url = this.apiFallback.custom(`albums/?ids=${ids}`);
        let albums_data = await albums_url.get();

        return albums_data.body().data().albums;
      }
    } catch(err) {
      console.error(err);
    }
  }

  get_tracks_for_album = async function(albumID) {
    try {
      let auth_token = localStorage.getItem('access_token');
      this.apiFallback.header('Accept', 'application/json');
      this.apiFallback.header('Authorization', `Bearer ${auth_token}`);
      const tracks_url = this.apiFallback.custom(`albums/${albumID}/tracks`);
      let tracks_data = await tracks_url.get();

      return tracks_data.body().data().items;
    } catch(err) {
      console.error(err);
    }
  }

  get_track = async function(trackID) {
    try {
      let auth_token = localStorage.getItem('access_token');
      this.apiFallback.header('Accept', 'application/json');
      this.apiFallback.header('Authorization', `Bearer ${auth_token}`);
      const tracks_url = this.apiFallback.custom(`tracks/${trackID}`);
      let tracks_data = await tracks_url.get();
      
      return tracks_data.body().data();
    } catch(err) {
      console.error(err);
    }
  }

  get_current_user = async function() {
    try {
      const data = await this.api.getMe();
      return data.body;
    } catch(err) {
      return err.statusCode;
    }
  }
  
  get_user_playlists = async function(userID) {
    try {
      const data = await this.api.getUserPlaylists(userID);
      return data.body;
    } catch(err) {
      return err.statusCode;
    }
  }

  get_playlist = async function(userID, playlistID) {
    try {
      const data = await this.api.getPlaylist(userID, playlistID);
      return data.body;
    } catch(err) {
      const spotifyPlaylist = await this.get_spotify_playlist(playlistID);
      return spotifyPlaylist;
    }
  }

  // If user has added public playlists, a separate call need to be done
  get_spotify_playlist = async function(playlistID) {
    let auth_token = localStorage.getItem('access_token');
    this.apiFallback.header('Accept', 'application/json');
    this.apiFallback.header('Authorization', `Bearer ${auth_token}`);
    const url = this.apiFallback.custom(`users/spotify/playlists/${playlistID}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

}

module.exports = SpotifyAPI;

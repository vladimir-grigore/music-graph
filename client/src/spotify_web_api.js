import SpotifyWebApi from 'spotify-web-api-node';
import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';
const path = require('path');

class SpotifyAPI {
  constructor(){
    this.api = new SpotifyWebApi({});
    this.apiFallback = restful('https://api.spotify.com/v1', fetchBackend(fetch));
  }

  set_api_token(token) {
    this.api.setAccessToken(token);
  }

  search_artists = async function(name) {
    const MissingArtistImage = path.resolve(__dirname, '/img/MissingCover.png');
    try {
      const data = await this.api.searchArtists(name);
      const artists = [];
      // Filter artist by popularity
      data.body.artists.items.forEach(function(item){
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
      console.error(err);
    }
  }
  
  get_albums_for_artist = async function(artistID) {
    try {
      const data = await this.api.getArtistAlbums(artistID, {limit: 20, market: 'US'})
      const ids = data.body.items.map(x => x.id);
      const result = await this.api.getAlbums(ids);
      return result.body.albums;
    } catch(err) {
      console.error(err);
    }
  }

  get_tracks_for_album = async function(albumID) {
    try {
      const data = await this.api.getAlbumTracks(albumID);
      return data.body.items;
    } catch(err) {
      console.error(err);
    }
  }

  get_track = async function(trackID) {
    try {
      const data = await this.api.getTracks([trackID]);
      return data.body;
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

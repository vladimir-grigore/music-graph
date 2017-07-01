import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';
import path from 'path';

class SpotifyAPI {
  constructor(){
    this.api = restful('https://api.spotify.com/v1', fetchBackend(fetch));
  }

  add_auth_token_to_request_header = () => {
    let auth_token = localStorage.getItem('access_token');
    this.api.header('Accept', 'application/json');
    this.api.header('Authorization', `Bearer ${auth_token}`);
  }

  search_artists = async function(name) {
    const MissingArtistImage = path.resolve(__dirname, '/img/MissingCover.png');
    const artists = [];
    this.add_auth_token_to_request_header();
    const url = this.api.custom(`search?q=${name}&type=artist`);
    
    try{
      let data = await url.get();
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
      this.add_auth_token_to_request_header();
      const artist_url = this.api.custom(`artists/${artistID}/albums?market=US&limit=20`);
      let artist_data = await artist_url.get();
      
      if(artist_data.body().data().items.length > 0){
        const ids = artist_data.body().data().items.map(x => x.id).join();
        const albums_url = this.api.custom(`albums/?ids=${ids}`);
        let albums_data = await albums_url.get();
        return albums_data.body().data().albums;
      }
    } catch(err) {
      console.error(err);
    }
  }

  get_tracks_for_album = async function(albumID) {
    try {
      this.add_auth_token_to_request_header();
      const tracks_url = this.api.custom(`albums/${albumID}/tracks`);
      let tracks_data = await tracks_url.get();
      return tracks_data.body().data().items;
    } catch(err) {
      console.error(err);
    }
  }

  get_track = async function(trackID) {
    try {
      this.add_auth_token_to_request_header();
      const tracks_url = this.api.custom(`tracks/${trackID}`);
      let tracks_data = await tracks_url.get();
      return tracks_data.body().data();
    } catch(err) {
      console.error(err);
    }
  }

  get_current_user = async function() {
    try {
      this.add_auth_token_to_request_header();
      const user_url = this.api.custom(`me`);
      let user_data = await user_url.get();
      return user_data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }
  
  get_user_playlists = async function(userID) {
    try {
      this.add_auth_token_to_request_header();
      const playlists_url = this.api.custom(`users/${userID}/playlists`);
      let playlists_data = await playlists_url.get();
      return playlists_data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

  get_playlist = async function(userID, playlistID) {
    try {
      this.add_auth_token_to_request_header();
      const playlist_details_url = this.api.custom(`users/${userID}/playlists/${playlistID}`);
      let playlist_tracks_data = await playlist_details_url.get();
      return playlist_tracks_data.body().data();
    } catch(err) {
      const spotifyPlaylist = await this.get_spotify_playlist(playlistID);
      return spotifyPlaylist;
    }
  }

  // If user has added public playlists, a separate call need to be done
  get_spotify_playlist = async function(playlistID) {
    this.add_auth_token_to_request_header();
    const url = this.api.custom(`users/spotify/playlists/${playlistID}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

}

module.exports = SpotifyAPI;

import SpotifyWebApi from 'spotify-web-api-node';

class SpotifyAPI {
  constructor(){
    this.api = new SpotifyWebApi({
      // clientId : process.env.CLIENT_ID
    });
  }

  set_api_token(token) {
    this.api.setAccessToken(token);
  }

  search_artists = async function(name) {
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
        image: item.images.length > 0 ? item.images[item.images.length - 1].url : 'nothing.jpg',
        popularity: item.popularity
      }));
    } catch(err) {
      console.error();
    }
  }
  
  get_albums_for_artist = async function(artistID) {
    try {
      const data = await this.api.getArtistAlbums(artistID, {limit: 20, market: 'US'})
      const ids = data.body.items.map(x => x.id);
      const result = await this.api.getAlbums(ids);
      return result.body.albums;
    } catch(err) {
      console.error();
    }
  }

  get_tracks_for_album = async function(albumID) {
    try {
      const data = await this.api.getAlbumTracks(albumID);
      return data.body.items;
    } catch(err) {
      console.error();
    }
  }

  get_track = async function(trackID) {
    try {
      const data = await this.api.getTracks([trackID]);
      return data.body;
    } catch(err) {
      console.error();
    }
  }

  get_current_user = async function() {
    try {
      const data = await this.api.getMe();
      return data.body;
    } catch (err) {
      return err.statusCode;
    }
  }
  
  get_user_playlists = async function(username) {
    try {
      const data = await this.api.getUserPlaylists(username);
      return data.body;
    } catch (err) {
      return err.statusCode;
    }
  }

  get_playlist = async function(userID, playlistID) {
    try {
      const data = await this.api.getPlaylist(userID, playlistID);
      return data.body;
    } catch (err) {
      return err.statusCode;
    }
  }

}

module.exports = SpotifyAPI;

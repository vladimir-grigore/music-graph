import SpotifyWebApi from 'spotify-web-api-node';

class SpotifyAPI {
  constructor(){
    this.api = new SpotifyWebApi({});
  }

  search_artists = async function(name) {
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
  }
  
  get_albums_for_artist = async function(artistID) {
    const data = await this.api.getArtistAlbums(artistID, {limit: 20, market: 'US'})
    const ids = data.body.items.map(x => x.id);
    const result = await this.api.getAlbums(ids);
    return result.body.albums;
  }

  get_tracks_for_album = async function(albumID) {
    const data = await this.api.getAlbumTracks(albumID);
    return data.body.items;
  }

  get_track = async function(trackID) {
    const data = await this.api.getTracks([trackID]);
    return data.body;
  }
}

module.exports = SpotifyAPI;

const WIDTH_SCALE = 2,
  GREEN = '#7CBF7F',
  BLUE = '#6584C7',
  RED = '#DC4B7C',
  PURPLE = '#8D65E0',
  FONT_GRAY = '#F0F0F0',
  EDGE_GRAY = '#A6A3A8';

import { DataSet, Network } from 'vis';

export default class Visualizer {
  constructor(container, spotify_API, nodes = [], edges = [], options = {}) {
    this.container = container;
    this.nodes = new DataSet(nodes);
    this.edges = new DataSet(edges);
    this.artistStructure = {};
    this.spotify_API = spotify_API;
    this.updateCallback = null;
    this.nextAlbumColor = 0;

    const data = {
      nodes: this.nodes,
      edges: this.edges
    };

    this.options = Object.assign({}, {
      nodes: {
        borderWidth: 4,
      },
      edges: {
        color: FONT_GRAY,
        smooth: true
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -300000
        },
        stabilization: {
          iterations: 5000
        }
      },
      groups: {
        artist: {
          shape: 'dot'
        },
        album: {
          shape: 'dot'
        },
        track: {
          shape: 'dot'
        }
      }
    }, options);

    this.network = new Network(this.container, data, options);
    this.network.on('click', this.onClick);
  }

  // Returns a random color to be used for track nodes
  randomColor() {
    const colorArray = [ GREEN, BLUE, RED, PURPLE ];
    if (this.nextAlbumColor == colorArray.length) {
      this.nextAlbumColor = 0;
    }
    let color =  colorArray[this.nextAlbumColor];
    this.nextAlbumColor += 1;
    return color;
  }

  // Returns a folder structure contaning artists
  // and their albums (with tracks) only when they are expanded
  getFolderStructure(){
    return this.artistStructure;
  }

  // Clear all nodes and edges (used for new searches)
  clear() {
    this.nodes.clear();
    this.edges.clear();
  }

  // Click a node - will spawn albums, tracks or play a track
  onClick = async ({ event, nodes }) => {
    event.preventDefault();
    event.stopPropagation();
    const [ id ] = nodes;
    if(!id) {
      return;
    }
    const node = this.nodes.get(id);

    switch (node.group) {
      case 'artist':
        let albums = await this.spotify_API.get_albums_for_artist(node.id);    
        this.toggleAlbums(node.id, albums);
        // When expanding an artist, clear the rest of the search results
        this.clearRemainingArtists(node);
        break;
      case 'album':
        let tracks = await this.spotify_API.get_tracks_for_album(node.id);
        this.toggleTracks(node.id, tracks);
        break;
      case 'track':
        let track = await this.spotify_API.get_track(node.id);
        // console.log("_-_", track.tracks[0]['preview_url']);
        break;
      default:
        console.log('sorry');
    }
    // Handle the asynchronous nature of onClick
    this.updateCallback();
  }

  // Clear all other artists, keep all ablums on the canvas
  clearRemainingArtists(current_node) {
    let all_nodes = this.nodes.get();
    for(let node of all_nodes){
      if (node.group === 'artist' && node.id != current_node.id) {
        this.nodes.remove(node.id);
        delete this.artistStructure[node.id];
      }
    }
  }

  toggleAlbums(artistID, albums) {
    albums.forEach(album => {
      this.toggleAlbumNode(artistID, album.id, album.name, album.images[album.images.length - 1].url, album.popularity);
      this.toggleAlbumEdge(artistID, album.id);
    });
  };

  toggleTracks(albumID, tracks){
    const color = this.randomColor();
    tracks.forEach(track => {
      this.toggleTrackNode(albumID, track.id, track.name, color);
      this.toggleTrackEdge(albumID, track.id);
    });
  }

  toggleArtistNode(id, label, image, popularity) {
    // Remove the artist node if it already exists
    if(this.nodes.get(id)){
      this.nodes.remove(id);
      delete this.artistStructure[id];
    } else {
      this.nodes.add({
        id,
        label,
        shape: 'circularImage',
        image,
        group: 'artist',
        value: popularity,
        color: {
          border: EDGE_GRAY,
          highlight: {
            border: FONT_GRAY
          }
        },
        font: {size: 8, color: FONT_GRAY, face: 'arial'}
      });
      this.artistStructure[id] = { name: label, albums: {} };
    }
  }

  toggleArtistEdge(from, to, label) {
    // Get the edge id and remove it if it exists
    let edge = this.edges.get({
      filter: function (item) {
        return (item.from == from && item.to == to);
      }
    });
    if(edge.length > 0){
      this.edges.remove(edge[0].id);
    } else {
      this.edges.add({
        from,
        to,
        label,
        width: WIDTH_SCALE,
      });
    }
  }

  async toggleAlbumNode(artistID, id, label, image, popularity) {
    // Remove the album node if it already exists
    let album = this.nodes.get(id);
    if(album){
      if(album.hasTracks){
        let tracks = await this.spotify_API.get_tracks_for_album(id);
        this.toggleTracks(id, tracks);
      }
      this.nodes.remove(id);
      // Remove albums from the folder structure
      delete this.artistStructure[artistID].albums[id]
    } else {
      this.nodes.add({
        id,
        label,
        shape: 'circularImage',
        image,
        group: 'album',
        value: popularity,
        color: {
          border: EDGE_GRAY,
          highlight: {
            border: FONT_GRAY
          }
        },
        hasTracks: false,
        font: {size: 8, color: FONT_GRAY, face: 'arial'}
      });
      // Add albums to the folder structure
      this.artistStructure[artistID].albums[id] = { name: label, tracks: {}, color: '' };
    }
  }

  toggleAlbumEdge(from, to) {
    // Get the edge id and remove it if it exists
    let edge = this.edges.get({
      filter: function (item) {
        return (item.from == from && item.to == to);
      }
    });
    if(edge.length > 0){
      this.edges.remove(edge[0].id);
    } else {
      this.edges.add({
        from,
        to,
        width: 0
      });
    }
  }

  toggleTrackNode(albumID, id, label, color) {
    // Get the artistID (used in the folder structure obj)
    for(var artistID in this.artistStructure) break;
    // Remove the track node if it already exists
    let album = this.nodes.get(albumID);
    if(this.nodes.get(id)){
      this.nodes.remove(id);
      // Remove tracks from the folder structure
      delete this.artistStructure[artistID].albums[albumID].tracks[id];
      this.nodes.update({id: albumID, hasTracks: false});
    } else {
      this.nodes.add({
        id,
        label,
        shape: 'dot',
        group: 'track',
        color,
        value: 3,
        font: {size: 8, color: FONT_GRAY, face: 'arial'}
      });
      this.nodes.update({id: albumID, hasTracks: true});
      // Add tracks to the folder structure
      this.artistStructure[artistID].albums[albumID].tracks[id] = { name: label };
      this.artistStructure[artistID].albums[albumID].color = color;
    }
  }

  toggleTrackEdge(from, to) {
    // Get the edge id and remove it if it exists
    let edge = this.edges.get({
      filter: function (item) {
        return (item.from == from && item.to == to);
      }
    });
    if(edge.length > 0){
      this.edges.remove(edge[0].id);
    } else {
      this.edges.add({
        from,
        to,
        width: 0
      });
    }
  }
}

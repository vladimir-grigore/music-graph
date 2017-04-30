const WIDTH_SCALE = 2,
  GREEN = '#7CBF7F',
  BLUE = '#6584C7',
  RED = '#DC4B7C',
  PURPLE = '#8D65E0',
  // FONT_GRAY = '#F0F0F0',
  // EDGE_GRAY = '#A6A3A8'
  FONT_GRAY = 'black',
  EDGE_GRAY = '#A6A3A8',
  BORDER = '#777'

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
      // nodes: {
      //   borderWidth: 4,
      // },
      edges: {
        // color: FONT_GRAY,
        color: { inherit: true },
        // smooth: true
        smooth: {
          enabled: true,
          type: 'curvedCCW',
          // forceDirection: 'none',
          roundness: .05,
        }
      },
      physics: {
        hierarchicalRepulsion: {
          centralGravity: 0,
          springLength: 10,
          springConstant: .01,
          nodeDistance: 10,
          damping: .19,
        },
        startStabilizing: true,
        maxVelocity: 19,
        minVelocity: .75,
        timestep: .5,
        // barnesHut: {
        //   gravitationalConstant: -3000
        // },
        // stabilization: {
        //   iterations: 5000
        // }
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
    if (this.nextAlbumColor === colorArray.length) {
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
        await this.handleArtistClick(node.id);
        break;
      case 'album':
        await this.handleAlbumClick(node.id);
        break;
      case 'track':
        // let track = await this.spotify_API.get_track(node.id);
        // console.log("You clicked a track", track);
        break;
      default:
        console.log('Sorry, something went wrong');
    }
    // Handle the asynchronous nature of onClick
    this.updateCallback();
  }

  // Clear all other artists, keep all ablums on the canvas
  clearRemainingArtists(current_node_id) {
    let all_nodes = this.nodes.get();
    for(let node of all_nodes){
      if (node.group === 'artist' && node.id != current_node_id) {
        this.nodes.remove(node.id);
        delete this.artistStructure[node.id];
      }
    }
  }

  // Get albums for artist, display them on the canvas and side bar
  handleArtistClick = async (artistID) => {
    let albums = await this.spotify_API.get_albums_for_artist(artistID);
    await this.toggleAlbums(artistID, albums);
    // When expanding an artist, clear the rest of the search results
    this.clearRemainingArtists(artistID);
    this.updateCallback();
  }

  // Get tracks for an album, display them on the canvas and side bar
  handleAlbumClick = async (albumID) => {
    let tracks = await this.spotify_API.get_tracks_for_album(albumID);
    await this.toggleTracks(albumID, tracks);
    this.updateCallback();
  }

  toggleAlbums = async (artistID, albums) => {
    albums.forEach(async (album) => {
      await this.toggleAlbumNode(artistID, album.id, album.name, album.images[album.images.length - 1].url, album.popularity);
      await this.toggleAlbumEdge(artistID, album.id);
    });
  };

  toggleTracks = async (albumID, tracks) => {
    const color = this.randomColor();
    tracks.forEach(async (track) => {
      await this.toggleTrackNode(albumID, track.id, track.name, track.preview_url, color);
      await this.toggleTrackEdge(albumID, track.id);
    });
  }

  toggleArtistNode = async (id, label, image, popularity) => {
    // Remove the artist node if it already exists
    if(this.nodes.get(id)){
      this.nodes.remove(id);
      delete this.artistStructure[id];
    } else {
      this.nodes.add({
        id,
        label,
        shape: 'circularImage',
        shapeProperties: {
          interpolation: false,  // only for image and circularImage shapes
        },
        borderWidth: 3,
        borderWidthSelected: 6,
        size: 50,
        shadow:{
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size:5,
          x:4,
          y:4
        },
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

  toggleArtistEdge = async (from, to, label) => {
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

  toggleAlbumNode = async (artistID, albumID, label, image, popularity) => {
    // Remove the album node if it already exists
    let album = this.nodes.get(albumID);
    if(album){
      if(album.hasTracks){
        await this.handleAlbumClick(albumID);
        this.updateCallback();
      }
      // Remove albums from the folder structure
      delete this.artistStructure[artistID].albums[albumID];
      this.nodes.remove(albumID);
    } else {
      this.nodes.add({
        id: albumID,
        label,
        shape: 'circularImage',
        shapeProperties: {
          interpolation: false,  // only for image and circularImage shapes
        },
        borderWidth: 3,
        borderWidthSelected: 6,
        size: 50,
        shadow:{
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size:5,
          x:2,
          y:2
        },
        image,
        group: 'album',
        value: popularity,
        color: {
          border: BORDER,
          highlight: {
            border: FONT_GRAY
          }
        },
        hasTracks: false,
        font: {size: 8, color: FONT_GRAY, face: 'arial'}
      });
      // Add albums to the folder structure
      this.artistStructure[artistID].albums[albumID] = { name: label, tracks: {}, color: '' };
    }
    this.updateCallback();
  }

  toggleAlbumEdge = async (from, to) => {
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

  toggleTrackNode = async (albumID, trackId, label, preview_url, color) => {
    // Get the artistID (used in the folder structure obj)
    for(var artistID in this.artistStructure) break;
    // Remove the track node if it already exists
    let album = this.nodes.get(albumID);
    if(this.nodes.get(trackId)){
      this.nodes.remove(trackId);
      // Remove tracks from the folder structure and clear album title color
      delete this.artistStructure[artistID].albums[albumID].tracks[trackId];
      this.artistStructure[artistID].albums[albumID].color = '';
      this.nodes.update({id: albumID, hasTracks: false});
    } else {
      this.nodes.add({
        id: trackId,
        label,
        shape: 'dot',
        borderWidth: 1,
        borderWidthSelected: 4,
        size: 20,
        shadow:{
          enabled: true,
          color: 'rgba(0,0,0,0.8)',
          size:5,
          x:1,
          y:1
        },
        group: 'track',
        color,
        value: 3,
        font: {size: 8, color: FONT_GRAY, face: 'arial'}
      });
      this.artistStructure[artistID].albums[albumID].tracks[trackId] = { name: label , url: preview_url};
      this.artistStructure[artistID].albums[albumID].color = color;
      // Add tracks to the folder structure
      this.nodes.update({id: albumID, hasTracks: true});
    }
    this.updateCallback();
  }

  toggleTrackEdge = async (from, to) => {
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

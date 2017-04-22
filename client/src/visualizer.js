const SpotifyAPI = require('./spotify_web_api.js');
const spotify_API = new SpotifyAPI();

const WIDTH_SCALE = 2,
  GREEN = '#81d664',
  RED = '#c5000b',
  ORANGE = '#ffaa00',
  GRAY = '#8e8b8b',
  BLACK = '#000000',
  BLUE = '#0c18f7';

import { DataSet, Network } from 'vis';

export default class Visualizer {
  constructor(container, nodes = [], edges = [], options = {}) {
    this.container = container;
    this.nodes = new DataSet(nodes);
    this.edges = new DataSet(edges);

    const data = {
      nodes: this.nodes,
      edges: this.edges
    };

    this.options = Object.assign({}, {
      interaction: { 
        hover: true 
      },
      nodes: {
        borderWidth: 4,
        color: {
          border: BLACK,
          background: GRAY
        },
        scaling: {
          min: 8,
          max: 16
        }
      },
      edges: {
        color: GRAY,
        smooth: false
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
          shape: 'dot',
          color: RED
        },
        album: {
          shape: 'dot',
          color: BLUE
        },
        track: {
          shape: 'dot',
          color: GREEN
        }
      }
    }, options);

    this.network = new Network(this.container, data, options);
    this.network.on('click', this.onClick);
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
        const albums = await spotify_API.get_albums_for_artist(node.id);
        albums.forEach(album => {
          this.toggleAlbumNode(album.id, album.name, album.images[album.images.length - 1].url, album.popularity);
          this.toggleAlbumEdge(node.id, album.id);
        });
        break;
      case 'album':
        const tracks = await spotify_API.get_tracks_for_album(node.id);
        tracks.forEach(track => {
          this.toggleTrackNode(track.id, track.name);
          this.toggleTrackEdge(node.id, track.id);
        });
        break;
      case 'track':
        const track = await spotify_API.get_track(node.id);
        // console.log("_-_", track.tracks[0]['preview_url']);
        break;
      default:
        console.log('sorry');
    }
    // const randomId = (new Date().getTime()).toString(36);
  }

  toggleArtistNode(id, label, image, popularity) {
    // Remove the artist node if it already exists
    if(this.nodes.get(id)){
      this.nodes.remove(id);
    } else {
      this.nodes.add({
        id,
        label,
        shape: 'circularImage',
        image,
        title: "Artist pop-up",
        group: 'artist',
        value: popularity
      });
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
      this.nodes.remove(edge[0].id);
    } else {
      this.edges.add({
        from,
        to,
        label,
        width: WIDTH_SCALE,
      });
    }
  }

  toggleAlbumNode(id, label, image, popularity) {
    // Remove the album node if it already exists
    if(this.nodes.get(id)){
      this.nodes.remove(id);
    } else {
      this.nodes.add({
        id,
        label,
        shape: 'circularImage',
        image,
        group: 'album',
        value: popularity,
        title: "Album pop-up"
      });
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
      this.nodes.remove(edge[0].id);
    } else {
      this.edges.add({
        from,
        to,
        width: WIDTH_SCALE,
        title: "Album edge pop-up",
        color: {color: BLUE, opacity: 0.3}
      });
    }
  }

  toggleTrackNode(id, label) {
    // Remove the track node if it already exists
    if(this.nodes.get(id)){
      this.nodes.remove(id);
    } else {
      this.nodes.add({
        id,
        label,
        shape: 'dot',
        group: 'track',
        color: GREEN,
        value: 6
      });
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
      this.nodes.remove(edge[0].id);
    } else {
      this.edges.add({
        from,
        to,
        width: WIDTH_SCALE,
        color: {color: GREEN, opacity: 0.3}
      });
    }
  }
}

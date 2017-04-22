const SpotifyAPI = require('./spotify_web_api.js');
const spotify_API = new SpotifyAPI();

const LENGTH_MAIN = 350,
  LENGTH_SERVER = 150,
  LENGTH_SUB = 50,
  WIDTH_SCALE = 2,
  GREEN = 'green',
  RED = '#C5000B',
  ORANGE = 'orange',
  GRAY = 'gray',
  BLACK = '#2B1B17',
  BLUE = 'blue';

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
      interaction: { hover: true },
      nodes: {
        scaling: {
          min: 8,
          max: 16
        }
      },
      edges: {
        color: GRAY,
        smooth: true
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -30000
        },
        stabilization: {
          iterations: 2500
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
          this.addAlbumNode(album.id, album.name, album.images[album.images.length - 1].url, album.popularity);
          this.addAlbumEdge(node.id, album.id);
        });
        break;
      case 'album':
        const tracks = await spotify_API.get_tracks_for_album(node.id);
        tracks.forEach(track => {
          this.addTrackNode(track.id, track.name);
          this.addTrackEdge(node.id, track.id);
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

  addArtistNode(id, label, image, popularity) {
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

  addArtistEdge(from, to, label) {
    this.edges.add({
      from,
      to,
      label,
      width: WIDTH_SCALE,
    });
  }

  addAlbumNode(id, label, image, popularity) {
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

  addAlbumEdge(from, to, label) {
    this.edges.add({
      from,
      to,
      label,
      width: WIDTH_SCALE * 2,
      title: "Album edge pop-up"
    });
  }

  addTrackNode(id, label) {
    this.nodes.add({
      id,
      label,
      shape: 'dot',
      group: 'track',
      color: GREEN,
      value: 6
    });
  }

  addTrackEdge(from, to, label) {
    this.edges.add({
      from,
      to,
      label,
      width: WIDTH_SCALE * 2
    });
  }
}

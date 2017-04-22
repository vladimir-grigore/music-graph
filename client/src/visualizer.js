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
  onClick = async ({ event, nodes, ...e }) => {
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
          this.addAlbumNode(album.id, album.name);
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

  addArtistNode(id, label) {
    this.nodes.add({
      id,
      label,
      shape: 'dot',
      title: "POPUP",
      group: 'artist',
      color: RED,
      value: 6
    });
  }

  addArtistEdge(from, to, label) {
    this.edges.add({
      from,
      to,
      label,
      width: WIDTH_SCALE * 2,
      title: "===="
    });
  }

  addAlbumNode(id, label) {
    this.nodes.add({
      id,
      label,
      shape: 'dot',
      group: 'album',
      color: BLUE,
      value: 6,
      title: "POP UP"
    });
  }

  addAlbumEdge(from, to, label) {
    this.edges.add({
      from,
      to,
      label,
      width: WIDTH_SCALE * 2,
      title: "POP UP"
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

// var network = null;
// var nodes = [];
// var edges = [];
// export function createArtistNodes(id, name) {
//   nodes.push({
//     id: id,
//     label: name,
//     group: 'artists',
//     value: 10
//   });
//   console.log("NODE", nodes)
// }
//   nodes.push({
//       id: 1,
//       label: 'ABBA',
//       group: 'switch',
//       value: 10
//   });
//   nodes.push({
//       id: 2,
//       label: 'Metallica',
//       group: 'switch',
//       value: 8
//   });
//   nodes.push({
//       id: 3,
//       label: 'Rammstein',
//       group: 'switch',
//       value: 6
//   });
//   nodes.push({
//       id: 4,
//       label: 'SPOTIFY',
//       group: 'switch',
//       value: 6
//   });
//   edges.push({
//       from: 1,
//       to: 4,
//       length: LENGTH_MAIN,
//       width: WIDTH_SCALE * 6,
//       label: '0.71 mbps'
//   });
//   edges.push({
//       from: 1,
//       to: 2,
//       length: LENGTH_MAIN,
//       width: WIDTH_SCALE * 6,
//       label: '0.71 mbps'
//   });
//   edges.push({
//       from: 1,
//       to: 3,
//       length: LENGTH_MAIN,
//       width: WIDTH_SCALE * 4,
//       label: '0.55 mbps'
//   });
//   // group around 2
//   for (var i = 90; i <= 104; i++) {
//       var value = 1;
//       var width = WIDTH_SCALE * 2;
//       var color = GRAY;
//       var label = null;
//       if (i === 103) {
//           value = 5;
//           width = 3;
//       }
//       if (i === 102) {
//           color = RED;
//           label = 'error';
//       }
//       nodes.push({
//           id: i,
//           label: '192.168.0.' + i,
//           group: 'desktop',
//           value: value
//       });
//       edges.push({
//           from: 2,
//           to: i,
//           length: LENGTH_SUB,
//           color: color,
//           fontColor: color,
//           width: width,
//           label: label
//       });
//   }
//   nodes.push({
//       id: 201,
//       label: '192.168.0.201',
//       group: 'desktop',
//       value: 1
//   });
//   edges.push({
//       from: 2,
//       to: 201,
//       length: LENGTH_SUB,
//       color: GRAY,
//       width: WIDTH_SCALE
//   });
//   // group around 3
//   nodes.push({
//       id: 202,
//       label: '192.168.0.202',
//       group: 'desktop',
//       value: 4
//   });
//   edges.push({
//       from: 3,
//       to: 202,
//       length: LENGTH_SUB,
//       color: GRAY,
//       width: WIDTH_SCALE * 2
//   });
//   for (var i = 210; i <= 235; i++) {
//       nodes.push({
//           id: i,
//           label: '192.168.0.' + i,
//           group: 'mobile',
//           value: 2
//       });
//       edges.push({
//           from: 3,
//           to: i,
//           length: LENGTH_SUB,
//           color: GRAY,
//           fontColor: GRAY,
//           width: WIDTH_SCALE
//       });
//   }
//   for (var i = 410; i <= 435; i++) {
//       nodes.push({
//           id: i,
//           label: 'Spotify.' + i,
//           group: 'mobile',
//           value: 2
//       });
//       edges.push({
//           from: 4,
//           to: i,
//           length: LENGTH_SUB,
//           color: GREEN,
//           fontColor: GRAY,
//           width: WIDTH_SCALE
//       });
//   }
//   // group around 1
//   nodes.push({
//       id: 10,
//       label: '192.168.0.10',
//       group: 'server',
//       value: 10
//   });
//   edges.push({
//       from: 1,
//       to: 10,
//       length: LENGTH_SERVER,
//       color: GRAY,
//       width: WIDTH_SCALE * 6,
//       label: '0.92 mbps'
//   });
//   nodes.push({
//       id: 11,
//       label: '192.168.0.11',
//       group: 'server',
//       value: 7
//   });
//   edges.push({
//       from: 1,
//       to: 11,
//       length: LENGTH_SERVER,
//       color: GRAY,
//       width: WIDTH_SCALE * 3,
//       label: '0.68 mbps'
//   });
//   nodes.push({
//       id: 12,
//       label: '192.168.0.12',
//       group: 'server',
//       value: 3
//   });
//   edges.push({
//       from: 1,
//       to: 12,
//       length: LENGTH_SERVER,
//       color: RED,
//       width: WIDTH_SCALE,
//       label: '0.3 mbps'
//   });
//   nodes.push({
//       id: 204,
//       label: 'Vlad',
//       group: 'internet',
//       value: 10
//   });
//   edges.push({
//       from: 1,
//       to: 204,
//       length: 200,
//       width: WIDTH_SCALE * 3,
//       label: '0.63 mbps'
//   });
//   // legend
//   // var mynetwork = document.getElementById('network');
//   // var x = -mynetwork.clientWidth / 2 + 50;
//   // var y = -mynetwork.clientHeight / 2 + 50;
//   // var step = 70;
//   // create a network
//   var container = document.getElementById('network');
//   var data = {
//       nodes: nodes,
//       edges: edges
//   };
//   var options = {
//       nodes: {
//           scaling: {
//               min: 16,
//               max: 32
//           }
//       },
//       edges: {
//           color: GRAY,
//           smooth: false
//       },
//       physics: {
//           barnesHut: {
//               gravitationalConstant: -30000
//           },
//           stabilization: {
//               iterations: 2500
//           }
//       },
//       groups: {
//           'switch': {
//               shape: 'dot',
//               color: '#FF9900' // orange
//           },
//           desktop: {
//               shape: 'dot',
//               color: "#2B7CE9" // blue
//           },
//           mobile: {
//               shape: 'dot',
//               color: "#5A1E5C" // purple
//           },
//           server: {
//               shape: 'dot',
//               color: "#C5000B" // red
//           },
//           internet: {
//               shape: 'dot',
//               color: "#109618" // green
//           },
//           artists: {
//               shape: 'dot',
//               color: "#ABCDEF" // red
//           }
//       }
//   };
//   network = new vis.Network(container, data, options);

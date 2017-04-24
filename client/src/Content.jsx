import React, {Component} from 'react';
import Visualizer from'./visualizer.js';

const network = document.getElementById('network');
const visualizer = new Visualizer(network);

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  render() {
    const c =  visualizer.getFolderStructure());
    return (
      <div className="contentArtist">
        <h1> Artist Name: {c.name} </h1>
      </div>
    )
  }
}

export default Content;

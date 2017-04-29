import React, {Component} from 'react';

class Playlists extends Component {

  render() {
    return (
      <div>
        <h1>PlayList Name</h1>
        <li>
          {this.props.playlists}
        </li>
      </div>
    )
  }
}

export default Playlists;

import React, {Component} from 'react';
import Albums from './Albums.jsx';

class Artist extends Component {
  constructor(props) {
    super(props);
  }
  artistClick(event) {
    this.props.handleArtist(this.props.id);
  }
  render() {
    const albums = Object.keys(this.props.albums)
    .map(item => <Albums key={item} id={item} value={this.props.albums[item].name} tracks={this.props.albums[item].tracks} color={this.props.albums[item].color}/>);
    return (
      <li className="list__item" onClick={this.artistClick.bind(this)}>
        {this.props.value}
        <ul>
          {albums}
        </ul>
      </li>
    )
  }
}

export default Artist;

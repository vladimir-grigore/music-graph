import React, {Component} from 'react';
import Artist from './Artist.jsx';
// import Albums from './Albums.jsx';

class Content extends Component {
  constructor(props) {
    super(props);
  }
  handleSelectedArtist(name){
    this.props.lookUpArtist(name)
  }
  render() {
    const artistEntry = Object.keys(this.props.data)
    .map(item => <Artist key={item} value={this.props.data[item].name} albums={this.props.data[item].albums} color={this.props.data[item].color}/>);

    // const albums = Object.keys(this.props.data)
    // .map(item => Object.keys(this.props.data[item].albums)
    //   .map(eachAlbum => <Albums key={eachAlbum} albums={this.props.data[item].albums[eachAlbum].name} />));
    //   {albums}

    return (
      <div className="artistEntry" id="content-wrapper">
        <ul className="nav content-nav" id="scroll-area">
          {artistEntry}
        </ul>
      </div>
    )
  }
}

export default Content;
//
// <a href="#" onClick={() => this.handleSelectedArtist({artistEntry})}>{artistEntry}</a>

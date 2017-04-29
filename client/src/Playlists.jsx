import React, {Component} from 'react';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: {}
    }
  }
  async componentWillMount(){
    const playlists = await this.props.getPlaylist();
    this.setState({playlists});
  }
  render() {
    const playlist = () => {
      const playlistName = [];
      const playlistId = [];
      for (let i in this.state.playlists.items){
        playlistName.push(this.state.playlists.items[i].name);
        playlistId.push(this.state.playlists.items[i].id);
      }
      return(
        <li key={playlistId} id={playlistId} >
          {playlistName}
        </li>
      );
    }
    return (
      <ul>
        <h1>PlayList Name</h1>
        {playlist()}
      </ul>
    )
  }
}

export default Playlists;

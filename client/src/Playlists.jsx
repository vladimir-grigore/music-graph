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
      for (let i in this.state.playlists.items){
        playlistName.push({id: this.state.playlists.items[i].id, name: this.state.playlists.items[i].name});
      }
      return playlistName;
    }
    return (
      <ul className="playlists">
        <h1>PlayList Name</h1>
        {playlist().map(e => {
          return (
            <li key={e.id} id={e.id}>
              {e.name}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Playlists;

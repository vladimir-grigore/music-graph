import React, {Component} from 'react';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: {}
    }
  }
  async componentWillMount(){
    if(localStorage.getItem('logged-in')){
      const playlists = await this.props.getPlaylist();
      this.setState({playlists});
    }
  }
  // getPlaylists = async () => {
  //   if(localStorage.getItem('logged-in')){
  //     const playlists = await this.props.getPlaylist();
  //     this.setState({playlists});
  //   } else {
  //     // this.this.state.({playlists: {}})
  //     console.log('pls login');
  //   }
  // }
  render() {
    if(!localStorage.getItem('logged-in')){
      return (<h1> Please Log in </h1>)
    } else {
      const playlist = () => {
        const playlistName = [];
        for (let i in this.state.playlists.items){
          playlistName.push({id: this.state.playlists.items[i].id, name: this.state.playlists.items[i].name});
        }
        return playlistName;
      }
      return (
        <ul className="playlists">
          <h1>Playlists: </h1>
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
}

export default Playlists;

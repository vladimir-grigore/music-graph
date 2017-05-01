import React, {Component} from 'react';
import Artist from './Artist.jsx';
import Playlists from './Playlists.jsx';
import Events from './Events.jsx';
import Speach from './Speach.jsx';
import SearchBar from './SearchBar.jsx';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  handleContent = (tab) => {
    if (tab === 'Artists') {
      return (
        <div>
          <SearchBar handleSearch={this.props.lookUpArtist} />
          {Object.keys(this.props.data)
            .map(item => <Artist key={item}
                                 id={item}
                                 value={this.props.data[item].name}
                                 albums={this.props.data[item].albums}
                                 color={this.props.data[item].color}
                                 artistMenuClick={this.props.artistMenuClick}
                                 albumMenuClick={this.props.albumMenuClick}
                                 trackMenuClick={this.props.trackMenuClick}
                                 />)}
        </div>
      )
    } else if (tab === 'Playlists') {
      return <Playlists />;
    } else if (tab === 'Say-to-Play') {
      return <Speach />;
    } else {
      // const eventEntry = Object.keys(this.props.events)
      // .map(item => <Events key={item} />);
      return <Events />
    }
  }
  render() {
    return (
      <div className='artistEntry' id='content-wrapper'>
        <ul className='nav content-nav' id='scroll-area'>
          {this.handleContent(this.props.currentTab)}
        </ul>
      </div>
    )
  }
}

export default Content;

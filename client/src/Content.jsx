import React, {Component} from 'react';
import Artist from './Artist.jsx';
import Playlists from './Playlists.jsx';
import Events from './Events.jsx';
import SearchBar from './SearchBar.jsx';
import Footer from './Footer.jsx';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  handleContent = (tab) => {
    if (tab === 'Artists') {
      if(!localStorage.getItem('logged-in')){
        return (
            <div className="artists">
              <SearchBar placeholder="Search for artist..." handleSearch={this.props.lookUpArtist} />
              <h1>Please log in</h1>
              <Footer song=''/>
            </div>
        ) 
      } else {
        return (
          <div className="artists">
            <SearchBar placeholder="Search for artist..." handleSearch={this.props.lookUpArtist} />
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
            <Footer song={this.props.song} />
          </div>
        )
      }
    } else if (tab === 'Playlists') {
      return <Playlists />;
    } else {
      return <Events song='' />
    }
  }
  render() {
    return (
      <div className='content-wrapper'>
        {this.handleContent(this.props.currentTab)}
      </div>
    )
  }
}

export default Content;

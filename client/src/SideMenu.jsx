import React, {Component} from 'react';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

class SideMenu extends Component {
  constructor(props) {
    super(props);
  }
  contentToggle() {
      var x = document.getElementById('content-wrapper');
      if (x.style.display === 'none') {
          x.style.display = 'block';
      } else {
          x.style.display = 'none';
      }
  }
  render() {
    return (
      <div className="nav-side-menu" id="sidebar-wrapper">
        <Header lookUpArtist={this.props.lookUpArtist} />
        <Content lookUpArtist={this.props.lookUpArtist} data={this.props.data} />
        <Footer />
      </div>
    )
  }
}

export default SideMenu;

// <button className="toggle-content" onClick={this.contentToggle.bind(this)}>Artists</button>
// <button className="toggle-playlists" onClick={this.contentToggle.bind(this)}>Playlists</button>
// <button className="toggle-events" onClick={this.contentToggle.bind(this)}>Events</button>

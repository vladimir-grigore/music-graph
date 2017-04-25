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
      <div id="sidebar-wrapper" className="nav-side-menu">
        <Header lookUpArtist={this.props.lookUpArtist} />
        <br></br>
        <button className="toggle-content" onClick={this.contentToggle.bind(this)}>Artists</button>
        <button className="toggle-playlists" onClick={this.contentToggle.bind(this)}>Playlists</button>
        <button className="toggle-events" onClick={this.contentToggle.bind(this)}>Events</button>
        <Content lookUpArtist={this.props.lookUpArtist} data={this.props.data} />
        <Footer />
      </div>
    )
  }
}

export default SideMenu;

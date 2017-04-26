import React, {Component} from 'react';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Toggle from './Toggle.jsx';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: true
    }
    this.handleToggle = this.handleToggle.bind(this);

  }
  contentToggle() {
      var x = document.getElementById('content-wrapper');
      if (x.style.display === 'none') {
          x.style.display = 'block';
      } else {
          x.style.display = 'none';
      }
  }

    handleToggle(){
      if (this.state.open){
        this.setState({ open : false})
      } else {
        this.setState({ open : true})
      }
    }
  render() {
    if (this.handleToggle) {
      return (
        <div className="nav-side-menu" id="sidebar-wrapper">
          <Toggle handleToggle={this.handleToggle} />
          <Header lookUpArtist={this.props.lookUpArtist} />
          <Content lookUpArtist={this.props.lookUpArtist} data={this.props.data} />
          <div className="content-tabs">
            <span className="tab-btn">Artists</span>
            <span className="tab-btn">Playlists</span>
            <span className="tab-btn">Events</span>
          </div>
          <Footer />
        </div>
      )
    } else {
      return (
        <div>

          <Toggle handleToggle={this.handleToggle} />
        </div>
      )
    }
  }
}
export default SideMenu;

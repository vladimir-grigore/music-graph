import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';

class SideMenu extends Component {
  constructor(props) {
     super(props);
   }
  render() {
    return (
      <div>
        <div className="sideNav" id="sidebar-wrapper">
          <SearchBar lookUpArtist={this.props.lookUpArtist} />
          <div className="nav-side-menu">
            <Content visualizer={this.props.visualizer} />
            <Footer />
          </div>
        </div>
     </div>
    )
  }
}

export default SideMenu;

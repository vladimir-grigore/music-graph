import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';

class SideMenu extends Component {
  constructor(props) {
     super(props);
   }

  render() {
    return (
      <div>
        <SearchBar />
        <div className="sideNav" id="sidebar-wrapper">
          <div className="nav-side-menu">

          </div>
        </div>
     </div>
    )
  }
}

export default SideMenu;

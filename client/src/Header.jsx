import React, {Component} from 'react';
import User from './User.jsx';
import SearchBar from './SearchBar.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-div">
        <User />
        <SearchBar lookUpArtist={this.props.lookUpArtist} />
      </div>
    )
  }
}


export default Header;

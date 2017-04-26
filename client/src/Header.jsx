import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-div">
        <SearchBar lookUpArtist={this.props.lookUpArtist} />
      </div>
    )
  }
}


export default Header;

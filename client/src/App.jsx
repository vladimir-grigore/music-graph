import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';
import SideMenu from './SideMenu.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <SearchBar />
        <SideMenu />
      </div>
    );
  }
}

export default App;

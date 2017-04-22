import React, {Component} from 'react';
import SearchBar from './SearchBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <SearchBar />
      </div>
    );
  }
}

export default App;

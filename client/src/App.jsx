import React, {Component} from 'react';
import SideMenu from './SideMenu.jsx';
import Toggle from './Toggle.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  handleToggle(yes){
    if (this.state.open){
      this.setState({ open : false})
    } else {
      this.setState({ open : true})
    }
  }

  render() {
    if (this.state.open) {
      console.log(this.props);
      return (
        <div>
          <SideMenu />
          <Toggle handleToggle={this.handleToggle.bind(this)} />
        </div>
      )
    } else {
      return (
        <div>
          <Toggle handleToggle={this.handleToggle.bind(this)} />
        </div>
      )
    }
  }
}

export default App;

import React, {Component} from 'react';
import Content from './Content.jsx';
import Tabs from './Tabs.jsx';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'Artists'
    }
  }
  async handleTabClick (tab) {
    this.setState({tab})
  }
  render() {
    return (
      <div className="nav-side-menu">
        <Tabs handleTabClick={this.handleTabClick.bind(this)} />
        <Content data={this.props.data}
                 currentTab={this.state.tab}
                 lookUpArtist={this.props.lookUpArtist}
                 artistMenuClick={this.props.artistMenuClick}
                 albumMenuClick={this.props.albumMenuClick}
                 trackMenuClick={this.props.trackMenuClick}
                 song={this.props.song}
                 />
      </div>
    )
  }
}

export default SideMenu;

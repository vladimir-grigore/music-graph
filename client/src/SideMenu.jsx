import React, {Component} from 'react';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
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
      <div className="nav-side-menu" id="sidebar-wrapper">
        <Header lookUpArtist={this.props.lookUpArtist} />
        <Tabs handleTabClick={this.handleTabClick.bind(this)} />
        <Content data={this.props.data}
                 currentTab={this.state.tab}
                 artistMenuClick={this.props.artistMenuClick}
                 albumMenuClick={this.props.albumMenuClick}
                 trackMenuClick={this.props.trackMenuClick}
                 />
        <Footer song={this.props.song} />
      </div>
    )
  }
}

export default SideMenu;

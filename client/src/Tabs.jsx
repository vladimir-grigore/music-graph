import React, {Component} from 'react';

class Tabs extends Component {
  render() {
    return (
      <div className="content-tabs">
        <span className="tab-btn" id="Events" onClick={this.props.handleTabClick}>Events</span>
        <span className="tab-btn" id="Playlists" onClick={this.props.handleTabClick}>Playlists</span>
        <span className="tab-btn" id="Artists" onClick={this.props.handleTabClick}>Artists</span>
      </div>
    )
  }
}

export default Tabs;

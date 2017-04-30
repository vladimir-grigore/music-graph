import React, {Component} from 'react';

class Tabs extends Component {
  handleClick = (event) => {
    this.props.handleTabClick(event.target.id);
  }
  render() {
    return (
      <div className="content-tabs">
        <span className="tab-btn" id="Say-to-Play" onClick={this.handleClick}>Say & Play</span>
        <span className="tab-btn" id="Events" onClick={this.handleClick}>Events</span>
        <span className="tab-btn" id="Playlists" onClick={this.handleClick}>Playlists</span>
        <span className="tab-btn" id="Artists" onClick={this.handleClick}>Artists</span>
      </div>
    )
  }
}

export default Tabs;

import React, {Component} from 'react';
import classNames from 'classnames';

class Tabs extends Component {
  handleClick = (event) => {
    this.props.handleTabClick(event.target.id);
  }
  render() {
    let artistsClass = 'tab-btn';
    let playlistsClass = 'tab-btn';
    let eventsClass = 'tab-btn';
     if (this.props.currentTab === 'Artists') {
      artistsClass = classNames('tab-btn', 'selected');
    } else if (this.props.currentTab === 'Playlists') {
      playlistsClass = classNames('tab-btn', 'selected');
    } else if (this.props.currentTab === 'Events') {
      eventsClass = classNames('tab-btn', 'selected');
    }

    return (
      <div className="content-tabs">
        {/*<span className="tab-btn" id="Say-to-Play" onClick={this.handleClick}>Say & Play</span>*/}
        <span className={eventsClass} id="Events" onClick={this.handleClick}>Events</span>
        <span className={playlistsClass} id="Playlists" onClick={this.handleClick}>Playlists</span>
        <span className={artistsClass} id="Artists" onClick={this.handleClick}>Artists</span>
      </div>
    )
  }
}

export default Tabs;

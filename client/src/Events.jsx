import React, {Component} from 'react';

class Events extends Component {
  render() {
    console.log('hi from events!');
    return (
      <div className="events">
        <h1>Events</h1>
        <span className="events-btn" id="byArtist" onClick={this.handleClick}>By Artist</span>
        <span className="events-btn" id="byVenue" onClick={this.handleClick}>By Venue</span>
     </div>
    )
  }
}

export default Events;

import React, {Component} from 'react';
import events from './events.js';
import EventsModal from './EventsModal.jsx';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
  }

  ///////////////Events Modal//////////////////
  openModal = () => {
    this.setState({ isModalOpen: true })
    events.get_events_by_artist_id(31754);
  }
  closeModal = () => {
    this.setState({ isModalOpen: false })
  }
  ///////////////Events Modal//////////////////

  ///////////////////////EVENTS API//////////////////////////
  // events.get_artist_by_name(artistName);
  // events.get_venue_by_name("Commodore");
  // events.get_events_by_venue_id(3816);
  // events.get_events_by_artist_id_start_end_date(31754, '2017-05-01', '2017-08-30');
  // events.get_events_by_venue_id_start_end_date(3816, '2017-05-01', '2017-08-30');
  ///////////////////////EVENTS API//////////////////////////

  render() {
    return (
      <div className="events">
        <EventsModal isOpen={this.state.isModalOpen} onClose={this.closeModal} />
        <h1>Events</h1>
        <button onClick={this.openModal}>Open Modal</button>
        <span className="events-btn" id="byArtist" onClick={this.handleClick}>By Artist</span>
        <span className="events-btn" id="byVenue" onClick={this.handleClick}>By Venue</span>
     </div>
    )
  }
}

export default Events;

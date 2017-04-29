import React, {Component} from 'react';
import EventsModal from './EventsModal.jsx';
import EventsAPI from './events.js';
const events = new EventsAPI();

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      eventResults: []
      //////////////////Fake Events////////////////////
      // fakeEnvents: [
      //   { 
      //   Id: 2927622,
      //   Date: "2017-05-10T00:00:00",
      //   TicketUrl: "http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F15005242EECB475C",
      //   Venue: {
      //     City: "Baltimore ",
      //     CountryCode: "US",
      //     Name: "M&T Bank Stadium",
      //     StateCode: "MD"
      //   }
      // },
      // {
      //   Id: 2927623,
      //   Date: "2017-05-12T00:00:00",
      //   TicketUrl: "http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F02005248D8DB65D7",
      //   Venue: {
      //     City: "Philadelphia",
      //     CountryCode: "US",
      //     Name: "Lincoln Financial Field",
      //     StateCode: "PA"
      //   }
      // },
      // {
      //   Id: 2927624,
      //   Date: "2017-05-14T00:00:00",
      //   TicketUrl: "http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F00005247E37848EF",
      //   Venue: {
      //     City: "East Rutherford",
      //     CountryCode: "US",
      //     Name: "MetLife Stadium ",
      //     StateCode: "NJ"
      //   }
      // }]
      //////////////////Fake Events////////////////////
    }
    events.updateCallback = this.handleEventsUpdate;
  }

  handleEventsUpdate = async (eventResults) => {
    this.setState({ eventResults });
  }

  openModal = async () => {
    await this.queryEvents();
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  queryEvents = async () => {
    await events.get_events_by_artist_id(31754);
  }

  ///////////////////////EVENTS API//////////////////////////
  // events.get_artist_by_name(artistName);
  // events.get_venue_by_name("Commodore");
  // events.get_events_by_venue_id(3816);
  // events.get_events_by_artist_id_start_end_date(31754, '2017-05-01', '2017-08-30');
  // events.get_events_by_venue_id_start_end_date(3816, '2017-05-01', '2017-08-30');
  ///////////////////////EVENTS API//////////////////////////

  render() {
    if(this.state.eventResults.length === 0){
      return (
        <div className="events">
          <h1>Events</h1>
          <button onClick={this.openModal}>Open Modal</button>
          <span className="events-btn" id="byArtist" onClick={this.handleClick}>By Artist</span>
          <span className="events-btn" id="byVenue" onClick={this.handleClick}>By Venue</span>
      </div>
      )
    } else {
        return (
        <div className="events">
          <EventsModal isOpen={this.state.isModalOpen} onClose={this.closeModal} events={this.state.eventResults.Events} />
          <h1>Events</h1>
          <button onClick={this.openModal}>Open Modal</button>
          <span className="events-btn" id="byArtist" onClick={this.handleClick}>By Artist</span>
          <span className="events-btn" id="byVenue" onClick={this.handleClick}>By Venue</span>
      </div>
      )
    }
  }
}

export default Events;

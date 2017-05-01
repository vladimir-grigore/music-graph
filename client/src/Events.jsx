import React, {Component} from 'react';
import EventsAPI from './events.js';
// const events = new EventsAPI();

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      // eventResults: []
      //////////////////Fake Events////////////////////
      fakeEnvents: [{
        Id: 2927622,
        Date: "2017-05-10T00:00:00",
        TicketUrl: "http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F15005242EECB475C",
        Venue: {
          City: "Baltimore ",
          CountryCode: "US",
          Name: "M&T Bank Stadium",
          StateCode: "MD"
        }
      },
      {
        Id: 2927623,
        Date: "2017-05-12T00:00:00",
        TicketUrl: "http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F02005248D8DB65D7",
        Venue: {
          City: "Philadelphia",
          CountryCode: "US",
          Name: "Lincoln Financial Field",
          StateCode: "PA"
        }
      },
      {
        Id: 2927624,
        Date: "2017-05-14T00:00:00",
        TicketUrl: "http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F00005247E37848EF",
        Venue: {
          City: "East Rutherford",
          CountryCode: "US",
          Name: "MetLife Stadium ",
          StateCode: "NJ"
        }
      }]
      //////////////////Fake Events////////////////////
    }
    // events.updateCallback = this.handleEventsUpdate;
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
    // await events.get_events_by_artist_id(31754);
  }

  ///////////////////////EVENTS API//////////////////////////
  // events.get_artist_by_name(artistName);
  // events.get_venue_by_name("Commodore");
  // events.get_events_by_venue_id(3816);
  // events.get_events_by_artist_id_start_end_date(31754, '2017-05-01', '2017-08-30');
  // events.get_events_by_venue_id_start_end_date(3816, '2017-05-01', '2017-08-30');
  ///////////////////////EVENTS API//////////////////////////

  render() {
    // if(this.state.eventResults.length === 0){
    // <EventsModal isOpen={this.state.isModalOpen} onClose={this.closeModal} events={this.state.eventResults.Events} />
    if(this.state.fakeEnvents.length === 0){
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
          <EventsModal isOpen={this.state.isModalOpen} onClose={this.closeModal} events={this.state.fakeEnvents} />
          <h1>Events</h1>
          <button onClick={this.openModal}>Open Modal</button>
          <span className="events-btn" id="byArtist" onClick={this.handleClick}>By Artist</span>
          <span className="events-btn" id="byVenue" onClick={this.handleClick}>By Venue</span>
        </div>
      )
    }
  }
}

class EventsModal extends Component {
  constructor(props) {
    super(props);
  }

  close = (e) => {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    if (this.props.isOpen === false) return null;
    const eventResults = this.props.events;
    const eventDetails = eventResults.map(event => {
      let event_id, date, ticket_url, venue_name, city_name, country_code, state_code;
      for ({ Date, TicketUrl, Venue } in event) {
        event_id = event.Id;
        date = event.Date.replace(/T\d{2}:\d{2}:\d{2}/,'').trim();
        ticket_url = event.TicketUrl;
        Object.keys(event.Venue).map(({Name, City, StateCode, CountryCode}) => {
          venue_name = event.Venue.Name.trim();
          city_name = event.Venue.City.trim();
          state_code = event.Venue.StateCode.trim();
          country_code = event.Venue.CountryCode.trim();
        });
        return <CustomTable key={event_id} date={date} venue_name={venue_name} city_name={city_name} state_code={state_code} country_code={country_code} ticket_url={ticket_url} />
      }
    });
    let modalClass = 'events-modal';
    if (this.props.isOpen) {
      modalClass += ' is-active';
    } else {
      modalClass += ' is-closing';
    }
    return (
      <div>
        <div className="events-backdrop" onClick={this.close}></div>
        <div className={modalClass}>
          <table id="gradient-style" summary="Venue Results">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Venue Name</th>
                <th scope="col">City Name</th>
                <th scope="col">State</th>
                <th scope="col">Country</th>
                <th scope="col">Tickets</th>
              </tr>
            </thead>
            <tbody>{eventDetails}</tbody>
            <tfoot><tr><td colSpan="6">Thank you for visiting our website!</td></tr></tfoot>
          </table>
        </div>
      </div>
    )
  }
}

class CustomTable extends Component {
  render(){
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.venue_name}</td>
        <td>{this.props.city_name}</td>
        <td>{this.props.state_code}</td>
        <td>{this.props.country_code}</td>
        <td><a href={this.props.ticket_url}>Buy</a></td>
      </tr>
    );
  }
}

export default Events;

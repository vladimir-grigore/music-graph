import React, {Component} from 'react';

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
    let modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '40%',
        height: '75%',
        width: '65%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        background: '#fff'
      }

      let backdropStyle = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndex: '9998',
        background: 'rgba(0, 0, 0, 0.3)'
      }
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
        return <li key={event_id}>{date}, {venue_name}, {city_name}, {state_code}, {country_code} <a href={ticket_url}>Buy Tickets</a></li>
      }
    });

    return (
      <div> 
        <div style={backdropStyle} onClick={this.close}></div>
        <div style={modalStyle} className="events-modal">
          <ul>Events Modal title
            {eventDetails}
          </ul>
        </div>
      </div>
    )
  }
}

export default EventsModal;

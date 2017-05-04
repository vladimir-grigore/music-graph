/////////////////Venues search//////////////////////
// queryResults: [
//          {Id: 1, Name: 'Commodore Ballroom', City: 'Vancouver', State: 'British Columbia', Country: 'CA'},
//          {Id: 2, Name: 'Commodore Barry Club', City: 'Philadelphia', State: 'Pennsylvannia', Country: 'US'},
//          {Id: 3, Name: 'Commodore Plaza', City: 'Coconut Grove', State: 'Florida', Country: 'US'},
//          {Id: 4, Name: 'Commodore Barry Park', City: 'Brooklyn', State: 'New York', Country: 'US'},
//          {Id: 5, Name: 'Commodore Ballroom', City: 'Vancouver', State: 'British Columbia', Country: 'CA'},
//          {Id: 6, Name: 'Commodore Barry Club', City: 'Philadelphia', State: 'Pennsylvannia', Country: 'US'},
//          {Id: 7, Name: 'Commodore Plaza', City: 'Coconut Grove', State: 'Florida', Country: 'US'},
//          {Id: 8, Name: 'Commodore Barry Park', City: 'Brooklyn', State: 'New York', Country: 'US'}
//       ],
/////////////////Venues search//////////////////////      
//////////////////Fake Events////////////////////		
const fakeEnvents = {Events: [
  {		
  Id: 2927622,		
  Date: '2017-05-10T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F15005242EECB475C',		
  Venue: {		
    City: 'Baltimore ',		
    CountryCode: 'US',		
    Name: 'M&T Bank Stadium',		
    StateCode: 'MD'		
  }		
},		
{		
  Id: 2927623,		
  Date: '2017-05-12T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F02005248D8DB65D7',		
  Venue: {		
    City: 'Philadelphia',		
    CountryCode: 'US',		
    Name: 'Lincoln Financial Field',		
    StateCode: 'PA'		
  }		
},		
{		
  Id: 2927624,		
  Date: '2017-05-14T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F00005247E37848EF',		
  Venue: {		
    City: 'East Rutherford',		
    CountryCode: 'US',		
    Name: 'MetLife Stadium ',		
    StateCode: 'NJ'		
  }		
},
 {		
  Id: 2927625,		
  Date: '2017-05-10T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F15005242EECB475C',		
  Venue: {		
    City: 'Baltimore ',		
    CountryCode: 'US',		
    Name: 'M&T Bank Stadium',		
    StateCode: 'MD'		
  }		
},		
{		
  Id: 29276236,		
  Date: '2017-05-12T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F02005248D8DB65D7',		
  Venue: {		
    City: 'Philadelphia',		
    CountryCode: 'US',		
    Name: 'Lincoln Financial Field',		
    StateCode: 'PA'		
  }		
},		
{		
  Id: 29276246,		
  Date: '2017-05-14T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F00005247E37848EF',		
  Venue: {		
    City: 'East Rutherford',		
    CountryCode: 'US',		
    Name: 'MetLife Stadium ',		
    StateCode: 'NJ'		
  }		
},
 {		
  Id: 29276227,		
  Date: '2017-05-10T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F15005242EECB475C',		
  Venue: {		
    City: 'Baltimore ',		
    CountryCode: 'US',		
    Name: 'M&T Bank Stadium',		
    StateCode: 'MD'		
  }		
},		
{		
  Id: 29276239,		
  Date: '2017-05-12T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F02005248D8DB65D7',		
  Venue: {		
    City: 'Philadelphia',		
    CountryCode: 'US',		
    Name: 'Lincoln Financial Field',		
    StateCode: 'PA'		
  }		
},		
{		
  Id: 297624,		
  Date: '2017-05-14T00:00:00',		
  TicketUrl: 'http://ticketmaster.evyy.net/c/252938/264167/4272?u=http%3A%2F%2Fticketmaster.com%2Fevent%2F00005247E37848EF',		
  Venue: {		
    City: 'East Rutherford',		
    CountryCode: 'US',		
    Name: 'MetLife Stadium ',		
    StateCode: 'NJ'		
  }		
}
]}		
 //////////////////Fake Events////////////////////


import React, {Component} from 'react';
import EventsAPI from './events.js';
import SearchBar from './SearchBar.jsx';
import Footer from './Footer.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
const events = new EventsAPI();

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
      eventTypeSearch: '',
      queryResults: [],
      // eventResults: fakeEnvents,
      eventResults: [],
      selectionId: '',
      selectionName: 'Search by name...',
      startDate: '',
      endDate: ''
    }
  }

  //Datepicked
  setStartDate = (date) => {
    this.setState({startDate: date});
  }
  //Datepicked
  setEndDate = (date) => {
    this.setState({endDate: date});
  }

  getEvents = (e) => {
    e.stopPropagation();
    if (this.state.selectionId && this.state.startDate && this.state.endDate) {
      this.queryByDate(this.state.selectionId);  
    } else if(this.state.selectionId) {
      this.queryById(this.state.selectionId);
    }
  }

  addIdToState = (id, name) => {
    this.setState({selectionId: id, selectionName: name});
  }

  // Once event button is clicked set its type to state {either Artist or Venue}
  handleEventTypeButtons = (eventType) => {
    this.setState({ eventTypeSearch: eventType, queryResults: [], eventResults: [], startDate: '', endDate: '', selectionId: '' })
  }

  // Use the name of either artist or venue and get its ID
  searchByName = async (name) => { // Get first query jamBase to get list of names & ids
    if ( this.state.eventTypeSearch === 'Venues' ){
      const queryResults = await events.get_venue_by_name(name);
      this.setState( { queryResults: queryResults.Venues, startDate: '', endDate: '', selectionId: '' } );
    } else {
      const queryResults = await events.get_artist_by_name(name);
      this.setState( { queryResults: queryResults.Artists, startDate: '', endDate: '', selectionId: '' } );
    }
  }

  // Second query for displaying information in the Modal
  queryById = async (id) => { // Get a name as input and queries for a list of matching names and their ids
    const type = this.state.eventTypeSearch;
    let eventResults = {};
    if ( type === 'Venues' ){
      eventResults = await events.get_events_by_venue_id(id);
      this.setState( { eventResults } );
      this.openModal();
    } else {
      eventResults = await events.get_events_by_artist_id(id);
      this.setState( { eventResults } );
      this.openModal();
    }
  }

  // Get events by either venue or artist id, start date and end date
  queryByDate = async (id) => { // Get a name as input and queries for a list of matching names and their ids
    const type = this.state.eventTypeSearch;
    let start = moment(this.state.startDate).format('YYYY-MM-DD');
    let end = moment(this.state.endDate).format('YYYY-MM-DD');
    let eventResults = {};
    if (type === 'Venues'){
      eventResults = await events.get_events_by_venue_id_start_end_date (id, start, end);
      this.setState( { eventResults } );
      this.openModal();
    } else {
      eventResults = await events.get_events_by_artist_id_start_end_date (id, start, end);
      this.setState( { eventResults } );
      this.openModal();
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    // Initial State
    if ( this.state.queryResults.length === 0 ) {
      return (
        <div>
          <div className='events'>
            <SearchBar placeholder={this.state.selectionName} handleSearch={this.searchByName} />
            <EventTypeButtons handleEventTypeButtons={this.handleEventTypeButtons} />
          </div>
          <Footer song={this.props.song} />
        </div>
      )
    } else if (this.state.eventResults.length === 0) {
      // When Search result is received and first query is complete save data
      const queryResultsList = (this.state.queryResults).map(item =>
        <SearchResultsList key={item.Id} id={item.Id}
                           item={item} eventTypeSearch={this.state.eventTypeSearch}
                           addIdToState={this.addIdToState}
                           />);                           
      // Render the list of results from first query
      return (
        <div>
          <div className='events'>
            <SearchBar placeholder={this.state.selectionName} handleSearch={this.searchByName} />
            <EventTypeButtons handleEventTypeButtons={this.handleEventTypeButtons} />
            <div className="date-picker">
              <div className="start-date">
                <DatePicker placeholderText="start date"
                            selected={this.state.startDate} dateFormat="YYYY-MM-DD" 
                            onChange={this.setStartDate} 
                            className="start-date-picker" />
              </div>
              <div className="end-date">
                <DatePicker placeholderText="end date"
                            selected={this.state.endDate} 
                            dateFormat="YYYY-MM-DD" 
                            onChange={this.setEndDate} 
                            className="end-date-picker" />
              </div>
            </div>
            <div className="venue-results">
              {queryResultsList}
            </div>
            <button className="search-button" onClick={this.getEvents}>Search</button>
          </div>
          <Footer song={this.props.song} />
        </div>
      )
    } else {
      const queryResultsList = (this.state.queryResults).map(item =>
        <SearchResultsList key={item.Id} id={item.Id}
                           item={item} eventTypeSearch={this.state.eventTypeSearch}
                           addIdToState={this.addIdToState}
                           />);  
      return (
        <div>
          <div className='events'>
            <EventsModal isOpen={this.state.isModalOpen} onClose={this.closeModal} events={this.state.eventResults.Events} 
                         eventTypeSearch={this.state.eventTypeSearch} />
            <SearchBar placeholder={this.state.selectionName} handleSearch={this.searchByName} />
            <EventTypeButtons handleEventTypeButtons={this.handleEventTypeButtons} />
            <div className="date-picker">
              <div className="start-date">
                <DatePicker placeholderText="start date"
                            selected={this.state.startDate} dateFormat="YYYY-MM-DD" 
                            onChange={this.setStartDate} 
                            className="start-date-picker" />
              </div>
              <div className="end-date">
                <DatePicker placeholderText="end date"
                            selected={this.state.endDate} 
                            dateFormat="YYYY-MM-DD" 
                            onChange={this.setEndDate} 
                            className="end-date-picker" />
              </div>
            </div>
            <div className="venue-results">
              {queryResultsList}
            </div>
            <button className="search-button" onClick={this.getEvents}>Search</button>
          </div>
          <Footer song={this.props.song} />
        </div>
      )
    } // End of if
  } // End of Render
}

// Wait for user to select Artist or Venue
class SearchResultsList extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.addIdToState(this.props.id, this.props.item.Name);
  }

  render() {
    if (this.props.eventTypeSearch === 'Venues') {
      return (
        <div className='events-venues'>
          <ul onClick={this.handleClick}>
            {this.props.item.Name}
            <li>
             {this.props.item.City}, {this.props.item.State}, {this.props.item.Country}
            </li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className='events-artists'>
          <ul onClick={this.handleClick}>
            {this.props.item.Name}
          </ul>
        </div>
      )
    } // End of if
  } // End of Render
} // End of SearchResultsList

// Modal to display information from second query
class EventsModal extends Component {
  constructor(props) {
    super(props);
  }

  close = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    if (this.props.isOpen === false) return null;
    const eventResults = this.props.events; // [{}] -> events={this.state.eventResults.Events} -> [{Artists}, {Venues}]
    if (this.props.eventTypeSearch === 'Venues') {
      const eventDetails = eventResults.map(event => {
        let event_id, date, ticket_url;
        let artist_name = [];
        event_id = event.Id;
        date = event.Date.replace(/T\d{2}:\d{2}:\d{2}/,'').trim();
        ticket_url = event.TicketUrl;
        event.Artists.map(artist => {
          artist_name.push(artist.Name.trim());
        });
        artist_name = artist_name.join(', ');
        // Create a row with all the information for each event
        return (
          <tr key={event_id}>
            <td>{date}</td>
            <td>{artist_name}</td>
            <td><a href={this.props.ticket_url} className="buy-tickets">Buy</a></td>
          </tr>
        )
      });
      // Create table
      return (
        <div>
          <div className='events-backdrop' onClick={this.close}></div>
          <div className='events-modal'>
            <table id='gradient-style' summary='Venue Results'>
              <thead>
                <tr>
                  <th scope='col'>Date</th>
                  <th scope='col'>Artist Name</th>
                  <th scope='col'>Tickets</th>
                </tr>
              </thead>
              <tbody>{eventDetails}</tbody>
              <tfoot><tr><td colSpan='3'>Thank you for visiting our website!</td></tr></tfoot>
            </table>
          </div>
        </div>
      )
    } else {  // If its Artists
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
      return (
        <div>
          <div className='events-backdrop' onClick={this.close}></div>
          <div className='events-modal'>
            <table id='gradient-style' summary='Venue Results'>
              <thead>
                <tr>
                  <th scope='col'>Date</th>
                  <th scope='col'>Venue Name</th>
                  <th scope='col'>City Name</th>
                  <th scope='col'>State</th>
                  <th scope='col'>Country</th>
                  <th scope='col'>Tickets</th>
                </tr>
              </thead>
              <tbody>{eventDetails}</tbody>
              <tfoot><tr><td colSpan='6'>Thank you for visiting our website!</td></tr></tfoot>
            </table>
          </div>
        </div>
      )
    } // End of If
  } // End of Render
} // End of Modal component

// Rows for each Artist
class CustomTable extends Component {
  render(){
    return (
      <tr key={this.props.event_id}>
        <td>{this.props.date}</td>
        <td>{this.props.venue_name}</td>
        <td>{this.props.city_name}</td>
        <td>{this.props.state_code}</td>
        <td>{this.props.country_code}</td>
        <td><a href={this.props.ticket_url} className="buy-tickets">Buy</a></td>
      </tr>
    );
  }
}

// To get information on which event is desired -> Either Venue || Artist
class EventTypeButtons extends Component {
  formSelector = (event) => {
    const eventType = event.target.className.split(' ')[1];
    this.props.handleEventTypeButtons(eventType);
  }
  render(){
    return (
      <div>
        <span className='form-venueBtn Venues' onClick={this.formSelector}>By Venue</span>
        <span className='form-artistBtn Artists' onClick={this.formSelector}>By Artist</span>
      </div>
    );
  }
}

export default Events;

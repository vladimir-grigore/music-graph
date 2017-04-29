import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

export default class EventsAPI {
  constructor(){
    this.API_KEY = process.env.API_KEY;
    this.api = restful('http://api.jambase.com', fetchBackend(fetch));
    this.updateCallback = null;
  }

  get_artist_by_name(name) {
    const url = this.api.custom(`artists?name=${name}&api_key=${this.API_KEY}`);
    url.get().then((response) => {
      const results = response.body();
      console.log("RESULTS:", results);
      console.log("RESULTS DATA", results.data());
      this.updateCallback(results.data());
    }).catch((err) => {
      console.error(err);
    });
  }

  get_venue_by_name(name) {
    const url = this.api.custom(`venues?name=${name}&api_key=${this.API_KEY}`);
    url.get().then((response) => {
      const results = response.body();
      console.log("RESULTS:", results);
      console.log("RESULTS DATA", results.data());
      this.updateCallback(results.data());
    }).catch((err) => {
      console.error(err);
    });
  }

  get_events_by_artist_id(artistID) {
    const url = this.api.custom(`events?artistId=${artistID}&api_key=${this.API_KEY}`);
    url.get().then((response) => {
      const results = response.body();
      console.log("RESULTS:", results);
      console.log("RESULTS DATA", results.data().Events);
      this.updateCallback(results.data());
    }).catch((err) => {
      console.error(err);
    });
  }

  get_events_by_venue_id(venueID) {
    const url = this.api.custom(`events?venueId=${venueID}&api_key=${this.API_KEY}`);
    url.get().then((response) => {
      const results = response.body();
      console.log("RESULTS:", results);
      console.log("RESULTS DATA", results.data());
      this.updateCallback(results.data());
    }).catch((err) => {
      console.error(err);
    });
  }

  get_events_by_artist_id_start_end_date(artistID, startDate, endDate) {
    const url = this.api.custom(`events?artistId=${artistID}&startDate=${startDate}&endDate=${endDate}&api_key=${this.API_KEY}`);
    url.get().then((response) => {
      const results = response.body();
      console.log("RESULTS:", results);
      console.log("RESULTS DATA", results.data());
      this.updateCallback(results.data());
    }).catch((err) => {
      console.error(err);
    });
  }

  get_events_by_venue_id_start_end_date(venueID, startDate, endDate) {
    const url = this.api.custom(`events?venueId=${venueID}&startDate=${startDate}&endDate=${endDate}&api_key=${this.API_KEY}`);
    url.get().then((response) => {
      const results = response.body();
      console.log("RESULTS:", results);
      console.log("RESULTS DATA", results.data());
      this.updateCallback(results.data());
    }).catch((err) => {
      console.error(err);
    });
  }
}

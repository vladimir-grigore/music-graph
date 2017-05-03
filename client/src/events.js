import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

export default class EventsAPI {
  constructor(){
    this.API_KEY = process.env.API_KEY;
    this.api = restful('//api.jambase.com', fetchBackend(fetch));
    this.updateCallback = null;
  }

  // Queries to jamBase for artists and venues by names and ids //

  get_artist_by_name = async (name) => {
    const url = this.api.custom(`artists?name=${name}&api_key=${this.API_KEY}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

  get_venue_by_name = async (name) => {
    const url = this.api.custom(`venues?name=${name}&api_key=${this.API_KEY}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

  get_events_by_artist_id = async (artistID) => {
    const url = this.api.custom(`events?artistId=${artistID}&api_key=${this.API_KEY}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

  get_events_by_venue_id = async (venueID) => {
    const url = this.api.custom(`events?venueId=${venueID}&api_key=${this.API_KEY}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

  get_events_by_artist_id_start_end_date = async (artistID, startDate, endDate) => {
    const url = this.api.custom(`events?artistId=${artistID}&startDate=${startDate}&endDate=${endDate}&api_key=${this.API_KEY}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

  get_events_by_venue_id_start_end_date = async (venueID, startDate, endDate) => {
    const url = this.api.custom(`events?venueId=${venueID}&startDate=${startDate}&endDate=${endDate}&api_key=${this.API_KEY}`);
    try{
      const data = await url.get();
      return data.body().data();
    } catch(err) {
      return err.statusCode;
    }
  }

}

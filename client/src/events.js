import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

const API_KEY = process.env.API_KEY;
const api = restful('http://api.jambase.com', fetchBackend(fetch));

function get_artist_by_name(name) {
  const url = api.custom(`artists?name=${name}&api_key=${API_KEY}`);
  url.get().then((response) => {
    const results = response.body();
    console.log("RESULTS:", results);
    console.log("RESULTS DATA", results.data());
  }).catch((err) => {
    console.error(err);
  });
}

function get_venue_by_name(name) {
  const url = api.custom(`venues?name=${name}&api_key=${API_KEY}`);
  url.get().then((response) => {
    const results = response.body();
    console.log("RESULTS:", results);
    console.log("RESULTS DATA", results.data());
  }).catch((err) => {
    console.error(err);
  });
}

function get_events_by_artist_id(artistID) {
  const url = api.custom(`events?artistId=${artistID}&api_key=${API_KEY}`);
  url.get().then((response) => {
    const results = response.body();
    console.log("RESULTS:", results);
    console.log("RESULTS DATA", results.data());
  }).catch((err) => {
    console.error(err);
  });
}

function get_events_by_venue_id(venueID) {
  const url = api.custom(`events?venueId=${venueID}&api_key=${API_KEY}`);
  url.get().then((response) => {
    const results = response.body();
    console.log("RESULTS:", results);
    console.log("RESULTS DATA", results.data());
  }).catch((err) => {
    console.error(err);
  });
}

function get_events_by_artist_id_start_end_date(artistID, startDate, endDate) {
  const url = api.custom(`events?artistId=${artistID}&startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`);
  url.get().then((response) => {
    const results = response.body();
    console.log("RESULTS:", results);
    console.log("RESULTS DATA", results.data());
  }).catch((err) => {
    console.error(err);
  });
}

function get_events_by_venue_id_start_end_date(venueID, startDate, endDate) {
  const url = api.custom(`events?venueId=${venueID}&startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`);
  url.get().then((response) => {
    const results = response.body();
    console.log("RESULTS:", results);
    console.log("RESULTS DATA", results.data());
  }).catch((err) => {
    console.error(err);
  });
}

module.exports = {
  get_artist_by_name,
  get_venue_by_name,
  get_events_by_artist_id,
  get_events_by_venue_id,
  get_events_by_artist_id_start_end_date,
  get_events_by_venue_id_start_end_date
}

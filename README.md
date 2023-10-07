# Discontinued

An online visualizer of music artists, their albums and tracks using the Spotify API. Features: artist albums and tracks displayed as force-directed graphs using the VisJs library, playback of tracks, display of user playlists, music event search by artist or venue using Jambase API. Technologies used: React, Node JS, Express, EJS, Webpack, Babel, Heroku, OAuth, Spotify and Jambase APIs.

## How to use:
### Artists tab 
- Type in the name of an artist and select one entry either from the canvas or the sidebar menu
- Expand each album by clicking on the canvas node or side menu
- Play any song by clicking on the canvas node or side menu

### Playlists tab
- Login with your Spotify account by clicking on the login button
- All current user playlists will be displayed
- Expand each playlist by clicking on the side menu
- Play any song by clicking on the side menu entry

### Events tab 
## NOTE: As of October 2018 JamBase's public API at http://api.jambase.com was disabled, as well as developer information at http://developer.jambase.com being removed without notice. No statement has been released by JamBase in regards to the public API's future. Currently both pages report a 596 "Service Not Found" error

- Select either artist or venue search type (note: default searches are made by artist)
- Type in the name of an artist or venue
- Select the desired entry from the list of search results
- Optional: select start and end dates
- Click search
- On the results modal, all events will have links to their Ticketmaster event page

NOTES: 
- Song playback is restricted to the 30 seconds preview for the moment. This is a limitation on the Spotify Web API terms of services. Once the Spotify team will provide full playback support, the app will be able to integrate the feature effortlessly.
- The playlists tab requires OAuth authentication with a Spotify account and will set a 60 min authentication token.
When the token expires, a re-login will be required.
- On the events tab, the Jambase API key is restricted to 2 queries/second and 50 queries/day. All subsequent queries will return a 403 code.

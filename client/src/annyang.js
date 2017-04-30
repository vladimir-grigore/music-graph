import $ from 'jquery';

const searchTracks = (sound, query) => {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'track'
    },
    success: function (response) {
      if (response.tracks.items.length) {
        const track = response.tracks.items[0];
        sound.src = track.preview_url;
        sound.play();
        communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
      }
    }
  });
}
const communicateAction = (text) => {
  const rec = document.getElementById('conversation');
  rec.innerHTML += '<li class="action">' + text + '</li>';
}
module.exports = { searchTracks, communicateAction };

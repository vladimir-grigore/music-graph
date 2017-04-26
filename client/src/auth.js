import $ from 'jquery';

function login(callback) {
  var REDIRECT_URI = process.env.NODE_ENV === 'production' ? 'https://musicgraph.herokuapp.com/callback': 'http://localhost:3000/callback'
  function getLoginURL(scopes) {
    return 'https://accounts.spotify.com/authorize?client_id=' + process.env.CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
  }

  var url = getLoginURL([ 'user-read-private' ]);
  var width = 450,
      height = 730,
      left = (screen.width / 2) - (width / 2),
      top = (screen.height / 2) - (height / 2);
      
  window.addEventListener("message", function(event) {
    var hash = JSON.parse(event.data);
    if (hash.type == 'access_token') {
      callback(hash.access_token);
    }
  }, false);
  
  var w = window.open(url,'Spotify',
    'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' 
    + width + ', height=' + height + ', top=' + top + ', left=' + left
  );  
}

function getUserData(accessToken) {
  return $.ajax({
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
}

var login_user = function() {
  return new Promise((resolve, reject) => {
    login(function(accessToken) {
      getUserData(accessToken)
        .then(function(response) {
          localStorage.setItem('user_name', response.display_name);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_image', response.images[0].url);
          localStorage.setItem('access_token', accessToken);
          resolve();
        }).catch(() => {
          reject();
        });
    });
  })
}

module.exports = {login_user};

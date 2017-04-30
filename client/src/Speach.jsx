import React, {Component} from 'react';
import anny from './annyang.js';
import annyang from 'annyang';

const audio = new Audio();

class Speach extends Component {
  constructor(props){
    super(props);
  }
  // communicateAction = (text) => {
  //   const rec = document.getElementById('conversation');
  //   return rec.innerHTML += '<li class="action">' + text + '</li>';
  // }
  recognized = (text) => {
    const rec = document.getElementById('conversation');
    return rec.innerHTML += '<ul class="recognized"><li>' + text + '</li></ul>';
  }
  playSong = (songName, artistName) => {
    let query = songName;
    if (artistName) {
      query += ' artist:' + artistName;
    }
    anny.searchTracks(audio, query);
  }
  componentWillMount(){
    if (annyang) {
      //First define the text we expect, and then the function it should call
      const commands = {
        'stop': function () {
          audio.pause();
        },
        'play track *song': ((song) => {
          this.recognized('Play track ' + song);
          this.playSong(song);
        }),
        'play *song by *artist': ((song, artist) => {
          this.recognized('Play song ' + song + ' by ' + artist);
          this.playSong(song, artist);
        }),
        'play song *song': ((song) => {
          this.recognized('Play song ' + song);
          this.playSong(song);
        }),
        'play *song': ((song) => {
          this.recognized('Play ' + song);
          this.playSong(song);
        }),
        'hi *word': ((word) => {
          this.recognized('Hello ' + word + '!');
        }),
        'how are you': () => {
          // console.log('I am well. How are you ?');
          this.recognized('I am well. How are you ? :)');
        },
        'log commands': () => {
          console.log(commands);
        },
        ':nomatch': ((message) => {
          this.recognized(message);
          anny.communicateAction('Sorry, I don\'t understand this action!');
        })
      };
      // Add our commands to annyang
      annyang.addCommands(commands);
      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
    }
    annyang.addCallback('error', (() => {
      anny.communicateAction('error');
    }));
  }
  render() {
    return (
      <div id="commands">
        <h1>Play songs through voice commands</h1>
        <p>For instance "Play Some Nights"</p>

        <h2>Voice commands</h2>
        <ul>
          <li>Play {'song name'}</li>
          <li>Play {'song name'} by {'artist name'}</li>
        </ul>
        <div id="conversation"></div>
      </div>
    )
  }
}

export default Speach;

// Code to read and set any environment variables with the dotenv package:
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api"); 
var omdb = require("omdb");
var fs = require("fs");

// Saves Twitter key from the keys.js file
var twitterKeys = new Twitter(keys.twitter);

// Saves keys for Spotify
var spotifyKeys = new Spotify(keys.spotify);

// Saves user input in a variable
var userInput = process.argv;
var command = userInput[2];
var nextCommand = userInput[3];

// Switch statement for the user commands
switch (command) {
  // Runs with Twitter
  case "my-tweets":
    searchTweet();
    break;
  // Runs with Spotify
  case "spotify-this-song":
    if (nextCommand === undefined) {
      console.log("Could not find the song you were looking for");
        // Returns results for Mambo Number 5 if the user search is undefined
      nextCommand = "Mambo Number 5"; 
      searchSong();
    } else {
      searchSong();
    }
    break;
  // Runs with OMDB
  case "movie-this":
    if (nextCommand === undefined) {
      console.log(
        "Could not find the movie you were looking for, but here is the information for Mr. Nobody:"
      );
        // Returns results for Mr. Nobody if the user search is undefined
      nextCommand = "Mr. Nobody";
      findMovie();
    } else {
      findMovie();
    }
    break;
  // Calls the readfile function
  case 'do-what-it-says':
    readFile();
}

//==============================Twitter Function=======================
function searchTweet() {
    var params = {screen_name: 'LaskysmUNCC', count: 20};
    twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
        
    })

}


// do i need to redo my dotenv as npm install dotenv --save ???

// Code to read and set any environment variables with the dotenv package:
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api"); 
var omdb = require("omdb");
var fs = require("fs");
var request = require("request");

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
        // Returns results for "The Sign" by Ace of Base if the user search is undefined
      nextCommand = "The Sign"; 
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
        for (var i = 0; i < tweets.length; i++) {
            if (!error) {
                console.log(tweets[i].text)
            }
        }
    })
}

//=============================Spotify Function=========================
function searchSong() {
    spotifyKeys.search({ type: 'track', query: nextCommand, limit: 5 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    console.log(data);
    });
}

//=============================OMDB Function==========================
function findMovie() {
    var queryUrl = "http://omdbapi.com/?t=" + nextCommand + "&y=&plot=short&apikey=f3aee967";
    request(queryUrl, function(error, response, body) {
        // if statement that checks for errors (if not it runs the following code)
        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " +JSON.parse(body).Title);
            console.log("Year Release: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).Rated);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Country: " + JSON.parse(body).Country);
            // Need to add something for Rotten Tomatoes!
            // End of If statement and display information
        }
    });
}


// do i need to redo my dotenv as npm install dotenv --save ???

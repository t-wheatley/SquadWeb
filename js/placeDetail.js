/**
 * Created by Tom on 11/07/2017.
 */

/**
 * TODO:
 * Load All Info
 * Display multiple images
 * Show the amount of Meetups at the Place
 * Link to MeetupList
 **/

// Global Stuff
// Firebase Database
var database = firebase.database();
var storage = firebase.storage();

// Global Variables
var placeId;

// Main to be run once the page is ready
var main = function () {

    // Get the placeId from the URL
    placeId = getParameterByName("placeId")

    // Starts the loading chain
    // loadPlace -> ...
    if (placeId !== null) {
        loadMeetup(placeId);
    } else {
        window.alert("Something went wrong!");
    }
}

// Function to get a paramater from the URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Runs the main when the document is ready
$(document).ready(main);
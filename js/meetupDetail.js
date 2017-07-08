/**
 * Created by Tom on 08/07/2017.
 */

// Global Stuff
// Firebase Database
var database = firebase.database();

// Global Variables
var squadId;
var hostId;

// Main to be run once the page is ready
var main = function () {
    // Testing the javascript is being run
    document.title = "lil pump ouu"


    // Starts the loading chain
    // loadMeetup -> loadSquadName -> loadHostName -> loadUsers
    loadMeetup("-KkLiIDxovOGIzH8iD5G");
}

// Function to load the Meetup's data
var loadMeetup = function (meetupId) {

    var detailsRef = database.ref("/meetups/" + meetupId);
    detailsRef.once("value").then(function (snapshot) {
        var name = snapshot.val().name;
        //var picture = snapshot.val().;
        squadId = snapshot.val().squad;
        var status = snapshot.val().name;
        var start = snapshot.val().startDateTime;
        var end = snapshot.val().endDateTime;
        var description = snapshot.val().description;
        var address1 = snapshot.val().address1;
        var address2 = snapshot.val().address2;
        var townCity = snapshot.val().townCity;
        var county = snapshot.val().county;
        var postCode = snapshot.val().postCode;
        hostId = snapshot.val().host;

        // Filling the fields with their data
        $("#name-field").text(name);
        $("#status-field").text(status);
        $("#start-field").text(unixToDate(start));
        $("#end-field").text(unixToDate(end));
        $("#description-field").text(description);
        $("#address-field").text(addressBuilder(address1, address2, townCity, county, postCode));

        // Load the name of the Squad
        loadSquadName();
    });
}

// Function to get the Squad's name
var loadSquadName = function () {
    // Loading the Squad's data
    var squadRef = database.ref("/squads/" + squadId);
    squadRef.once("value").then(function (snapshot) {

        // Gets the name of the Squad
        var squadName = snapshot.val().name;

        // Displays the name of the Squad
        $("#squad-field").text(squadName);

        loadHostName();
    })
}

// Function to get the Host's name
var loadHostName = function () {
    // Loading the Host's data
    var squadRef = database.ref("/users/" + hostId);
    squadRef.once("value").then(function (snapshot) {

        // Gets the name of the Host
        var hostName = snapshot.val().name;

        // Displays the name of the Host
        $("#host-field").text(hostName);

    })
}

// Function to convert UNIX DatTime to a readable string
var unixToDate = function (timeStamp) {
    var tempDate = new Date(timeStamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = tempDate.getFullYear();
    var month = months[tempDate.getMonth()];
    var date = tempDate.getDate();
    var hour = tempDate.getHours();
    var min = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes();
    var sec = tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

// Function to build a readable address string
var addressBuilder = function (address1, address2, townCity, county, postCode) {
    var tempAddress = "";
    if (address1.length != 0)
        tempAddress = tempAddress + address1;
    if (address2.length != 0)
        tempAddress = tempAddress + ", " + address2;
    if (townCity.length != 0)
        tempAddress = tempAddress + ", " + townCity;
    if (county.length != 0)
        tempAddress = tempAddress + ", " + county;
    if (postCode.length != 0)
        tempAddress = tempAddress + ", " + postCode;

    return tempAddress;
}

$(document).ready(main);
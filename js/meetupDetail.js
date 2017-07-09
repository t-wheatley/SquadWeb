/**
 * Created by Tom on 08/07/2017.
 */

// Global Stuff
// Firebase Database
var database = firebase.database();
var storage = firebase.storage();

// Global Variables
var meetupId;
var squadId;
var hostId;

// Main to be run once the page is ready
var main = function () {
    // Testing the javascript is being run
    document.title = "lil pump ouu"

    $("#meetupDetail").addClass("active");

    // Test meetupId
    meetupId = "-KkLiIDxovOGIzH8iD5G"

    // Starts the loading chain
    // loadMeetup -> loadSquadName -> loadHostName -> loadPicture -> loadUsers
    loadMeetup(meetupId);
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
        $("#status-field").text(convertStatus(status));
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

        loadPicture();
    })
}

// Function to load the Meetup's picture
var loadPicture = function () {
    var pictureRef = storage.ref("meetups/" + meetupId + ".jpg");

    // Get the download URL
    pictureRef.getDownloadURL().then(function (url) {
        // Displaying the image for the Meetup
        var img = document.getElementById('meetup-image');
        img.src = url;
        $("#meetup-image").removeClass("hidden");
    }).catch(function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object_not_found':
                $("#meetup-image").hide();
                break;

            case 'storage/unauthorized':
                $("#meetup-image").hide();
                break;

            case 'storage/canceled':
                $("#meetup-image").hide();
                break;


            case 'storage/unknown':
                $("#meetup-image").hide();
                break;
        }
    });
}

// Function to convert UNIX DatTime to a readable string
var unixToDate = function (timeStamp) {
    var tempDate = new Date(timeStamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = tempDate.getFullYear();
    var month = months[tempDate.getMonth()];
    var date = tempDate.getDate();
    var hour = tempDate.getHours();
    var min = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes();
    var sec = tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
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

// Function to convert the status number into a readable status
var convertStatus = function (intStatus) {
    if (intStatus === 0) {
        return "Upcoming";
    } else if (intStatus === 1) {
        return "Ongoing";
    } else if (intStatus === 2) {
        return "Expired";
    } else {
        return "Deleted";
    }
}

// Runs the main when the document is ready
$(document).ready(main);
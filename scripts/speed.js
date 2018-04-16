window.onload = start;

const now = new Date();

function start() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var u = url.searchParams.get("u");
    var t = url.searchParams.get("t");
    writeData(u, t);
}


// Get a reference to the database service
var database = firebase.database();

function writeData(user, task) {
    // A post entry.
    var postData = {
        userName: user,
        time: now,
    };

    var newPostKey = firebase.database().ref().child(task).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/' + task + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
};


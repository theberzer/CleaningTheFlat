window.onload = readyPage;

function readyPage(){
	document.getElementById("register").onclick = writeData;
}

var database = firebase.database(); 

  function writeData() {
    var name = document.getElementById("name").value;
    var user = document.getElementById("userName").value;
    var kitchen = document.getElementById("kitchen").value;
   // A post entry.
    var postData = {
    name: name,
    userName: user,
    kitchen: kitchen,
    };

    var newPostKey = firebase.database().ref().child('users').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}; 
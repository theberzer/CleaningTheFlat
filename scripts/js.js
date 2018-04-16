window.onload = readyPage;

const now = new Date();

function readyPage(){
 document.getElementById("userNameBtn").onclick = writeData;
 var url = new URL(window.location.href);
    var apartment = url.searchParams.get("a");
    console.log(apartment);

};

  // Get a reference to the database service
  var database = firebase.database(); 

  function writeData() {
    var user = document.getElementById("userName").value;
   // A post entry.
    var postData = {
    userName: user,
    time: now,
    };

    var task;
    if (document.getElementById("dishes").checked){
      task = 'dishes';
    } else if(document.getElementById("trash").checked){
      task = 'trash';
    }

    var newPostKey = firebase.database().ref().child(task).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/' + task + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}; 

  
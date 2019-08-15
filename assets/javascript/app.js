// //empty strings for inputs
// var trainName = ""; 
// var destination = ""; 
// var firstTrain = ""; 
// var freq = "";

// Firebase configuration
var config ={
    apiKey: "AIzaSyBC0me7WY-ij5QcUpOLFR7mMnwSGFyBX90",
    authDomain: "train-ee077.firebaseapp.com",
    databaseURL: "https://train-ee077.firebaseio.com",
    projectId: "train-ee077",
    storageBucket: "",
    messagingSenderId: "915225904563",
    appId: "1:915225904563:web:9eb5292997fdeddb"
};

// Initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();

function addTrain(event){
    event.preventDefault();
  
    console.log("You clicked me")
  
    name = $("#name").val().trim();
    console.log('name:', name)
    dest = $("#dest").val().trim();
    console.log('dest:', dest)
    first = $("#first").val().trim();
    console.log('first:', first)
    freq = $("#freq").val().trim();
    console.log('freq:', freq)

    database.ref().push({
      name: name,
      dest: dest,
      first: first,
      freq: freq
    }); 
  }

  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
  
    var row = $("<tr>");
    var d1 = $("<td>");
    var d2 = $("<td>");
    var d3 = $("<td>");
    var d4 = $("<td>");
    var d5 = $("<td>");
    var d6 = $("<td>");
    var table = $("#table");
  
    name = snapshot.val().name;
    dest = snapshot.val().dest;
    first = snapshot.val().first;
    freq = snapshot.val().freq;
  
    d1.append(name);
    d2.append(dest);
    d3.append(freq);
  
    var firstTimeConverted = moment(first, "HH:mm");
    console.log("time converted: " + firstTimeConverted);

    console.log("First time: " + first); 

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    d5.append(tMinutesTillTrain); 

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    d4.append(moment(nextTrain).format("hh:mm")); 

    row.append(d1);
    row.append(d2);
    row.append(d3);
    row.append(d4);
    row.append(d5);
    row.append(d6);
    table.append(row)
  })

  $("#add-train").on("click", addTrain)
  
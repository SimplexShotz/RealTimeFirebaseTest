
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC82qKSxASHV73ab3MhmfZOw1OUryZwEqI",
  authDomain: "realtimefirebasetest.firebaseapp.com",
  databaseURL: "https://realtimefirebasetest.firebaseio.com",
  projectId: "realtimefirebasetest",
  storageBucket: "realtimefirebasetest.appspot.com",
  messagingSenderId: "628446710214"
};
firebase.initializeApp(config);

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(250);
}

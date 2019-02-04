
var database, ref;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
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
  database = firebase.database();
  ref = {
    pts: database.ref("pts")
  };
}

function draw() {
  background(250);
  if (mouseIsPressed) {
    ref.pts.push({
      x: mouseX,
      y: mouseY
    });
  }
}

ref.pts.on("value", function(data) {
  var d = data.val();
  background(255);
  fill(0, 0, 255);
  noStroke();
  for (var i in d) {
    ellipse(d[i].x, d[i].y, 10, 10);
  }
});

ref.pts.once("value", function(data) {
  var d = data.val();
  background(255);
  fill(0, 0, 255);
  noStroke();
  for (var i in d) {
    ellipse(d[i].x, d[i].y, 10, 10);
  }
});

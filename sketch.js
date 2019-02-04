
var database, ref;

var txt = {};

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
    pts: database.ref("pts"),
    txt: database.ref("txt")
  };

  ref.txt.once("value", function(data) {
    var d = data.val();
    txt = d;
  });
  ref.txt.on("value", function(data) {
    var d = data.val();
    txt = d;
  });
  
//   ref.pts.once("value", function(data) {
//     var d = data.val();
//     background(255);
//     fill(0, 0, 255);
//     noStroke();
//     for (var i in d) {
//       ellipse(d[i].x, d[i].y, 10, 10);
//     }
//   });
//   ref.pts.on("value", function(data) {
//     var d = data.val();
//     background(255);
//     fill(0, 0, 255);
//     noStroke();
//     for (var i in d) {
//       ellipse(d[i].x, d[i].y, 10, 10);
//     }
//   });
}

var typing = {
  t: "",
  x: -1,
  y: -1
};

function keyTyped() {
  if (typing.x !== -1) {
    if (keyCode !== 8 && keyCode !== 13) {
      typing.t += key;
    } else if (keyCode === 8) {
      typing.t = typing.t.split("").splice(0, typing.t.length - 1).join("");
    } else {
      ref.txt.push(typing);
      typing = {
        t: "",
        x: -1,
        y: -1
      };
    }
  }
}

function draw() {
  background(255);
  if (mouseIsPressed) {
    typing = {
      t: "",
      x: mouseX,
      y: mouseY
    };
  }
  for (var i in txt) {
    text(txt[i].t, txt[i].x, txt[i].y);
  }
  if (typing.x !== -1) {
    fill(0);
    textSize(12);
    textAlign(LEFT, TOP);
    text(typing.t, typing.x, typing.y);
  }
}

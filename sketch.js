
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
      var p = typing.t.split("").splice(0, typing.t.split("").length - 1).join("");
      typing.t = p;
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
    if (typing.t !== "") {
      typing.x = mosueX;
      typing.y = mouseY;
    } else {
      typing = {
        t: "",
        x: mouseX,
        y: mouseY
      };
    }
  }
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  for (var i in txt) {
    text(txt[i].t, txt[i].x, txt[i].y);
  }
  if (typing.x !== -1) {
    var s = 5;
    text(typing.t + (floor(frameCount / 30) % 2 ? "|" : ""), typing.x, typing.y);
    noFill();
    stroke(0);
    rect(typing.x - s, typing.y - s, textWidth(typing.t + "|") + s * 2, typing.t.split("\n").length * 14 + s * 2);
  }
}

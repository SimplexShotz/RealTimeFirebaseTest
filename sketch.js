
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

function hover(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

var typing = {
  t: "",
  x: -1,
  y: -1
};

var kp = [];
var keyPressed = function() {
  kp[keyCode] = true;
  if (keyCode === 8) {
    typing.t = typing.t.split("").splice(0, typing.t.split("").length - 1).join("");
    if (kp[16]) {
      typing.t = "";
    }
  }
};
var keyReleased = function() {
  kp[keyCode] = false;
};

var pmx = mouseX;
var pmy = mouseY;

var mp = false;
function mousePressed() {
  mp = true;
}

function keyTyped() {
  if (typing.x !== -1) {
    if (keyCode !== 8 && keyCode !== 13) {
      typing.t += key;
    } else if (keyCode === 13 && !kp[16]) {
      if (typing.t !== "") {
        var send = {
          t: typing.t,
          x: typing.x / window.innerWidth,
          y: typing.y / window.innerHeight
        };
        ref.txt.push(send);
      }
      typing = {
        t: "",
        x: -1,
        y: -1
      };
    } else if (keyCode === 13 && kp[16]) {
      typing.t += "\n";
    }
  }
}

function draw() {
  cursor();
  background(255);
  if (mouseIsPressed) {
    pmx = typing.x;
    pmy = typing.y;
    if (typing.t !== "") {
      typing.x = mouseX;
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
  text("Welcome to the Online Editor Board!\n\n Click anywhere to create a new message.\n Use \"enter\" to send a message.\n Click on any message to edit it.\n\n Use \"shift + enter\" to create a new line.\n Use \"shift + delete\" to erase an entire message.", 20, 20);
  var s = 5;
  for (var i in txt) {
    var w = 0;
    for (var j = 0; j < txt[i].t.split("\n").length; j++) {
      if (textWidth(txt[i].t.split("\n")[j]) > w) {
        w = textWidth(txt[i].t.split("\n")[j]);
      }
    }
    fill(0);
    if (hover(txt[i].x * window.innerWidth - s, txt[i].y * window.innerHeight - s, w + s * 2, txt[i].t.split("\n").length * 15 + s * 2 - 2)) {
      cursor(HAND);
      fill(100);
      if (mp) {
        if (typing.t !== "") {
          var send = {
            t: typing.t,
            x: pmx / window.innerWidth,
            y: pmy / window.innerHeight
          };
          ref.txt.push(send);
        }
        typing = {
          t: txt[i].t,
          x: txt[i].x * window.innerWidth,
          y: txt[i].y * window.innerHeight
        };
        ref.txt.child(i).remove();
        mp = false;
        continue;
      }
    }
    text(txt[i].t, txt[i].x * window.innerWidth, txt[i].y * window.innerHeight);
  }
  if (typing.x !== -1) {
    fill(255);
    stroke(0);
    var longest = 0;
    for (var i = 0; i < typing.t.split("\n").length; i++) {
      if (textWidth(typing.t.split("\n")[i]) > longest) {
        longest = textWidth(typing.t.split("\n")[i]);
      }
    }
    rect(typing.x - s, typing.y - s, longest + textWidth("|") + s * 2, typing.t.split("\n").length * 15 + s * 2 - 2);
    fill(0);
    noStroke();
    text(typing.t + (floor(frameCount / 30) % 2 ? "|" : ""), typing.x, typing.y);
  }
  mp = false;
}

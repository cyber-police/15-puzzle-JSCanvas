var stains = [];

var isTransition = false;

var canvas;
var ctx;

var cursorPos = function (e) {
  getCursorPosition(canvas, e);
};

// var positions = [
//   [9, 1, 11, 15],
//   [4, 8, 7, 2],
//   [5, 6, 13, 10],
//   [12, 14, 3, 0],
// ];

var positions = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 0, 15],
];

var a = 0;
var xCord = 200;
var yCord = 50;
var img;

var numberElements = 1;
var numberOfelement;
var counter = 0;

var isInit = false;

function getCursorPosition(canvas, event) {
  xCord = 200;
  yCord = 50;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  for (var i = 0; i <= 15; i++) {
    if (
      x >= stains[i].xCord &&
      x <= stains[i].xCord + stains[i].width &&
      y >= stains[i].yCord &&
      y <= stains[i].yCord + stains[i].height
    ) {
      onClickTile(stains[i].id);
      return;
    }
  }
}

function translate() {
  xCord += 170;

  numberElements++;

  if ((numberElements - 1) % 4 == 0) {
    xCord = 200;
    yCord += 160;
  }
  if (numberElements <= 16) {
    initElements();
  } else {
    isInit = true;
  }
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("click", cursorPos);
  initElements();
}

function initElements() {
  var j = Math.trunc((numberElements - 1) / 4);

  numberOfelement = positions[j][a];

  a++;

  if (a > 3) {
    a = 0;
  }

  img = new Image();
  img.id = numberOfelement;

  if (!isInit) {
    if (img.id != 0) {
      img.onload = function () {
        ctx.drawImage(img, xCord, yCord);
        img.xCord = xCord;
        img.yCord = yCord;
        stains.push(img);
        translate();
      };
      img.src = `images/stain-${img.id}.jpg`;
    } else {
      stains.push(img);
      translate();
    }
  } else {
    if (img.id != 0) {
      img.src = `images/stain-${img.id}.jpg`;
      ctx.drawImage(img, xCord, yCord);
      img.xCord = xCord;
      img.yCord = yCord;
    }
    stains.push(img);
    translate();
  }
}

function onClickTile(event) {
  if (isTransition) return;

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (event == positions[i][j]) {
        var activeElement = [i, j];
        isTransition = true;
        console.log("clicked", event);
        changePosition(activeElement);
        return;
      }
    }
  }
}

function changePosition(activeElement) {
  if (
    positions[activeElement[0] - 1] != null &&
    positions[activeElement[0] - 1][activeElement[1]] == 0
  ) {
    positions[activeElement[0] - 1][activeElement[1]] =
      positions[activeElement[0]][activeElement[1]];
    positions[activeElement[0]][activeElement[1]] = 0;
    rebuildPuzzle();
  } else if (
    positions[activeElement[0] + 1] != null &&
    positions[activeElement[0] + 1][activeElement[1]] == 0
  ) {
    positions[activeElement[0] + 1][activeElement[1]] =
      positions[activeElement[0]][activeElement[1]];
    positions[activeElement[0]][activeElement[1]] = 0;
    rebuildPuzzle();
  } else if (positions[activeElement[0]][activeElement[1] + 1] == 0) {
    positions[activeElement[0]][activeElement[1] + 1] =
      positions[activeElement[0]][activeElement[1]];
    positions[activeElement[0]][activeElement[1]] = 0;
    rebuildPuzzle();
  } else if (positions[activeElement[0]][activeElement[1] - 1] == 0) {
    positions[activeElement[0]][activeElement[1] - 1] =
      positions[activeElement[0]][activeElement[1]];
    positions[activeElement[0]][activeElement[1]] = 0;
    rebuildPuzzle();
  } else {
    isTransition = false;
  }
}

function rebuildPuzzle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stains = [];
  numberElements = 1;
  counter = 0;
  a = 0;
  xCord = 200;
  yCord = 50;
  initElements();
  onWinConditions();
}

function onWinConditions() {
  var countPos = positions.length - 1;
  var stainCounter = 1;
  isTransition = false;

  for (var i = 0; i <= countPos; i++) {
    for (var j = 0; j <= countPos; j++) {
      if (i == countPos && j == countPos) {
        showWinDialogue();
      }
      if (positions[i][j] != stainCounter) {
        return;
      }
      stainCounter++;
    }
  }
}

function showWinDialogue() {
  destroy();
  var win = new winDialogue();
  win.drawDialogue(canvas, ctx);
}

function destroy() {
  canvas.removeEventListener("click", cursorPos);
  stains = [];
}

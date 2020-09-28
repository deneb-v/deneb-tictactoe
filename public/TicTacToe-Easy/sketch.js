let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// let board = [
//   ['x', 'o', 'x'],
//   ['x', 'o', 'x'],
//   ['o', 'x', '']
// ];

let player = ['o', 'x']

let cHeight = 400;
let cWidth = 400;

let h = cHeight / 3;
let w = cWidth / 3;

let turn = 0;

var btn_refresh;
var btn_home;



function drawBoardLine() {
  line(0, h, cWidth, h);
  line(0, h * 2, cWidth, h * 2);
  line(w, 0, w, cHeight);
  line(w * 2, 0, w * 2, cHeight);
}

function findAvailable() {
  var available = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] == '') {
        available.push([y, x]);
      }
    }
  }
  return available;
}

let available = [];

function botStep() {

  let available = findAvailable();
  let idx = floor(random(available.length));
  let spot = available.splice(idx, 1)[0];
  board[spot[0]][spot[1]] = player[turn % 2];
  turn++;
}

function getEmpty() {
  let counter = 0;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] == '') {
        counter++;
      }
    }
  }
  return counter;
}

function mousePressed() {
  if (turn % 2 == 0) {
    var xClicked = floor(mouseX / w);
    var yClicked = floor(mouseY / h);
    console.log('x: ' + xClicked + 'y : ' + yClicked)
    if (board[yClicked][xClicked] == '') {
      board[yClicked][xClicked] = player[turn % 2];
      turn++;
      botStep();
    }
  }
}

function checkSame(a, b, c) {
  if (a == b && b == c && a == c && a != '') {
    return true;
  } else {
    return false;
  }
}

function checkWin() {
  //H
  for (let x = 0; x < 3; x++) {
    if (checkSame(board[x][0], board[x][1], board[x][2]) == true) {
      return player[(turn - 1) % 2];
    }
  }
  //V
  for (let x = 0; x < 3; x++) {
    if (checkSame(board[0][x], board[1][x], board[2][x]) == true) {
      return player[(turn - 1) % 2];
    }
  }
  //D
  if (checkSame(board[0][0], board[1][1], board[2][2]) == true) {
    return player[(turn - 1) % 2];
  }
  if (checkSame(board[0][2], board[1][1], board[2][0]) == true) {
    return player[(turn - 1) % 2];
  }
  if (getEmpty() == 0) {
    return 'tie';
  }
  return null;
}

function refresh() {
  document.location.reload();
}

function home() {
  document.location.href = document.location.href.replace('/easy', '/');
}

function setup() {
  createCanvas(cWidth, cHeight);
  available = findAvailable();

  //btn_refresh 
  btn_refresh = createButton('Refresh');
  btn_refresh.addClass('btn');
  btn_refresh.mouseClicked(refresh);

  //btn_home
  btn_home = createButton('Home');
  btn_home.addClass('btn');
  btn_home.mouseClicked(home);

}

function draw() {
  background(255);
  strokeWeight(3);
  stroke('black');
  noFill();
  drawBoardLine();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = w * j + w / 2;
      let y = h * i + h / 2;
      let r = w / 4;
      if (board[i][j] == player[1]) {
        stroke('red');
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      } else if (board[i][j] == player[0]) {
        noFill();
        stroke('blue');
        ellipse(x, y, r * 2);
      }
    }
  }
  let winner = checkWin();
  if (winner != null || getEmpty() == 0) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (winner == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${winner} wins!`);
    }
  }
}
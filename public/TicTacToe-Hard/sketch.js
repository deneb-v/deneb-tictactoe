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

let human = 'o'
let bot = 'x'

let cHeight = 400;
let cWidth = 400;

let h = cHeight / 3;
let w = cWidth / 3;

let currentPlayer = human;

//button

var btn_refresh;
var btn_home;



function drawBoardLine() {
  line(0, h, cWidth, h);
  line(0, h * 2, cWidth, h * 2);
  line(w, 0, w, cHeight);
  line(w * 2, 0, w * 2, cHeight);
}

let run = 0;

let scores = {
  x: 10,
  o: -10,
  tie: 0
};

function abp(board, isMax) {
  // return 1;
  run++;
  let result = checkWin();
  if (result !== null) {
    // console.log(scores[result]);
    return scores[result];
  }
  if (isMax) {
    let bestScore = -Infinity;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (board[y][x] == '') {
          board[y][x] = 'x';
          let score = abp(board, false);
          board[y][x] = '';
          bestScore = max(score, bestScore);
          // console.log(bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (board[y][x] == '') {
          board[y][x] = 'o';
          let score = abp(board, true);
          board[y][x] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function botStep() {

  // let available = findAvailable();
  // let idx = floor(random(available.length));
  // let spot = available.splice(idx, 1)[0];
  // board[spot[0]][spot[1]] = player[turn % 2];
  // turn++;

  let bestScore = -Infinity;
  let move;
  run = 0;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] == '') {
        board[y][x] = bot;
        let score = abp(board, false);
        board[y][x] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { y, x };
        }
      }
    }
  }
  // console.log(move);
  console.log(run);
  if (checkWin() == null) {
    board[move.y][move.x] = bot;
  }
  console.log(move);
  currentPlayer = human;
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
  if (currentPlayer == human && checkWin() == null) {
    let xClicked = floor(mouseX / w);
    let yClicked = floor(mouseY / h);
    console.log('clicked');
    if (board[yClicked][xClicked] == '') {
      board[yClicked][xClicked] = human;
      currentPlayer = bot;
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
      return board[x][0];
    }
  }
  //V
  for (let x = 0; x < 3; x++) {
    if (checkSame(board[0][x], board[1][x], board[2][x]) == true) {
      return board[0][x];
    }
  }
  //D
  if (checkSame(board[0][0], board[1][1], board[2][2]) == true) {
    return board[0][0];
  }
  if (checkSame(board[0][2], board[1][1], board[2][0]) == true) {
    return board[0][2];
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
  document.location.href = document.location.href.replace('/hard', '/');
}

function setup() {
  createCanvas(cWidth, cHeight);

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
      if (board[i][j] == bot) {
        stroke('red');
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      } else if (board[i][j] == human) {
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
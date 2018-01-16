function findGameStatus(board) {
  var yWin = false,
    rWin = false;
  const yTest = "YYYY";
  const rTest = "RRRR";
  const solution = board.shift();
  const rows = board.shift();
  const cols = board.shift();
  var vertsY = new Array(cols);
  vertsY.fill("0");
  var vertsR = new Array(cols);
  vertsR.fill("0");
  var horiz = new Array(cols);

  board.forEach((row, iRow) => {
    const test = row.join("");
    if (!!~test.indexOf(yTest)) {
      yWin = true;
    }
    if (!!~test.indexOf(rTest)) {
      rWin = true;
    }
    row.forEach((val, iCol) => {
      horiz[iCol] || (horiz[iCol] = []);
      horiz[iCol][iRow] = val;
      if (val == "Y") {
        vertsY[iCol] = "Y";
      } else if (val == "R") {
        vertsR[iCol] = "R";
      }
    });
    if (!!~vertsY.join("").indexOf(yTest)) {
      yWin = true;
    }
    if (!!~vertsR.join("").indexOf(rTest)) {
      rWin = true;
    }
  });
  horiz.forEach(col => {
    const test = col.join("");
    if (!!~test.indexOf(yTest)) {
      yWin = true;
    }
    if (!!~test.indexOf(rTest)) {
      rWin = true;
    }
  });
  var rslt;
  if (!yWin && !rWin) {
    rslt = "N";
  } else if (yWin && !rWin) {
    rslt = "Y";
  } else if (!yWin && rWin) {
    rslt = "R";
  } else {
    rslt = "B";
  }
  console.log(solution, ': ', rslt);
}
var testBoards = [
  [
    "R",
    6,
    7,
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "R", "0", "0", "0"],
    ["0", "0", "0", "R", "0", "0", "0"],
    ["0", "0", "0", "R", "0", "0", "0"],
    ["0", "0", "0", "R", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0"]
  ],
  [
    "R",
    6,
    7,
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "R", "R", "R", "R"],
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0"]
  ],
  [
    "Y",
    6,
    7,
    ["Y", "0", "0", "0", "0", "0", "0"],
    ["0", "R", "0", "0", "0", "0", "0"],
    ["0", "0", "Y", "0", "0", "0", "0"],
    ["0", "0", "0", "Y", "0", "0", "0"],
    ["0", "0", "0", "0", "Y", "0", "0"],
    ["0", "0", "0", "0", "0", "Y", "0"]
  ],
  [
    "Y",
    6,
    7,
    ["0", "0", "0", "0", "0", "R", "0"],
    ["0", "0", "0", "0", "Y", "0", "0"],
    ["0", "0", "0", "Y", "0", "0", "0"],
    ["0", "0", "Y", "0", "0", "0", "0"],
    ["0", "Y", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "R", "R", "R"]
  ],
  [
    "B",
    6,
    7,
    ["0", "R", "R", "Y", "R", "0", "0"],
    ["0", "0", "0", "0", "R", "0", "0"],
    ["0", "0", "0", "Y", "R", "0", "0"],
    ["0", "0", "Y", "0", "R", "0", "0"],
    ["0", "Y", "0", "0", "0", "0", "0"],
    ["Y", "0", "0", "0", "0", "0", "R"]
  ],
  [
    "B",
    6,
    7,
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "R", "R", "R", "R", "0", "0"],
    ["0", "0", "0", "Y", "Y", "Y", "Y"],
    ["0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0"]
  ]
];
testBoards.forEach(testBoard => {
  findGameStatus(testBoard);
});

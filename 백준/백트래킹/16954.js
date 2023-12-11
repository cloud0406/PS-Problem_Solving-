const solutionRecursion = (board) => {
  const START = [7, 0];
  const EMPTY = ".";
  const TOP_LINE = 0;
  const NEWROW = ["........"];

  const bt = (cRow, cCol, currBoard, top) => {
    if (cRow === 0 && cCol === 7) return 1;

    if (!currBoard[cRow] || currBoard[cRow][cCol] !== EMPTY) return 0;

    if (cRow === 0) return 1;
    if (cRow <= top) return 1;

    const nextBoard = NEWROW.concat(currBoard.slice(0, -1));

    const ways = [
      [-1, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
      [-1, 1],
      [0, 0],
      [1, 0],
      [1, -1],
      [1, 1],
    ];
    for (const [nr, nc] of ways) {
      const nRow = cRow + nr;
      const nCol = cCol + nc;

      if (
        currBoard[nRow] &&
        currBoard[nRow][nCol] === EMPTY &&
        bt(nRow, nCol, [...nextBoard], top + 1)
      )
        return 1;
    }

    return 0;
  };

  let [sRow, sCol] = START;
  return bt(sRow, sCol, board, TOP_LINE);
};

const solutionIteration = (board) => {
  const START = [7, 0];
  const BYUK = "#";
  const NEWROW = ["........"];
  let top = -1;

  // 가장 높은 벽의 위치 찾기
  for (const row in board) {
    if (board[row].includes(BYUK)) {
      top = row;
      break;
    }
  }

  if (top === -1) return 1;

  const ways = [
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [0, 0],
    [1, 0],
    [1, -1],
    [1, 1],
  ];
  const queue = [START];

  while (queue.length) {
    let thisLoop = queue.length;
    while (thisLoop--) {
      const [crow, ccol] = queue.shift();

      if (crow < 0 || crow > 7 || ccol < 0 || ccol > 7) continue;
      if (board[crow][ccol] === BYUK) continue;

      if (crow < top || (crow === 0 && ccol === 7)) return 1;

      for (const [row, col] of ways) {
        const nrow = crow + row;
        const ncol = ccol + col;
        if (nrow < 0 || nrow > 7 || ncol < 0 || ncol > 7) continue;
        if (board[nrow][ncol] === BYUK) continue;
        queue.push([nrow, ncol]);
      }
    }

    board = NEWROW.concat(board.slice(0, -1));

    top++;
  }

  return 0;
};

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

let q = [];
rl.on("line", (line) => {
  line ? q.push(line) : rl.close();
}).on("close", () => {
  console.log(solution(q));
  process.exit();
});

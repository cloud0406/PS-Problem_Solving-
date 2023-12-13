const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16954.txt"
  )
  .toString()
  .trim()
  .split("\n");

const solutionRecursion = (board) => {
  const START = [7, 0];
  const EMPTY = ".";
  const TOP_LINE = 0;
  const NEWROW = ["........"];

  // 백트래킹으로 추적
  const bt = (cRow, cCol, currBoard, top) => {
    if (cRow === 0 && cCol === 7) return 1;

    if (!currBoard[cRow] || currBoard[cRow][cCol] !== EMPTY) return 0;

    if (cRow === 0 || cRow <= top) return 1;

    // 다음 라운드, 보드 한 줄씩 아래로 이동
    const nextBoard = NEWROW.concat(currBoard.slice(0, -1));

    // 캐릭터 이동할 수 있는 모든 경우의 수
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

      // 다음 좌표가 정상이고, 벽이 아니고, 다음 좌표에서 재귀적으로 탐색 가능한 경우
      if (
        currBoard[nRow] &&
        currBoard[nRow][nCol] === EMPTY &&
        bt(nRow, nCol, [...nextBoard], top + 1)
      )
        return 1;
    }

    // 위에서 탐색 불가능한 경우 return false
    return 0;
  };

  // 출발점에서 백트래킹 시작
  let [sRow, sCol] = START;
  return bt(sRow, sCol, board, TOP_LINE);
};

console.log(solutionRecursion(input));

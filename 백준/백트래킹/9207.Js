const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/9207.txt"
  )
  .toString()
  .trim()
  .split("\n");

const directions = {
  dx: [0, 0, 1, -1],
  dy: [1, -1, 0, 0],
};

function findMinimumPins(board, moveCount, gameState) {
  // 현재 보드에서 핀 위치 찾기
  const pins = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === "o") {
        pins.push([col, row]);
      }
    }
  }

  // 현재 상태가 더 적은 핀을 가지고 있다면 결과 갱신
  const currentPins = pins.length;
  if (currentPins <= gameState.minPins) {
    if (currentPins < gameState.minPins) {
      gameState.minPins = currentPins;
      gameState.minMoves = moveCount;
    } else {
      gameState.minMoves = Math.min(gameState.minMoves, moveCount);
    }
  }

  for (const [x, y] of pins) {
    for (let dir = 0; dir < 4; dir++) {
      const jumpX = x + directions.dx[dir];
      const jumpY = y + directions.dy[dir];
      const landX = jumpX + directions.dx[dir];
      const landY = jumpY + directions.dy[dir];

      // 이동 가능 조건
      // 1. 착륙 지점이 보드 내에 있는지
      // 2. 뛰어넘을 핀이 있는지
      // 3. 착륙 지점이 비어있는지
      if (
        landX >= 0 &&
        landX < 9 &&
        landY >= 0 &&
        landY < 5 &&
        board[jumpY][jumpX] === "o" &&
        board[landY][landX] === "."
      ) {
        board[y][x] = ".";
        board[jumpY][jumpX] = ".";
        board[landY][landX] = "o";

        findMinimumPins(board, moveCount + 1, gameState);

        board[y][x] = "o";
        board[jumpY][jumpX] = "o";
        board[landY][landX] = ".";
      }
    }
  }
}

let currentLine = 0;
const T = Number(input[currentLine++]);

for (let testCase = 0; testCase < T; testCase++) {
  const board = [];
  for (let i = 0; i < 5; i++) {
    board.push(input[currentLine++].split(""));
  }

  const gameState = { minPins: Infinity, minMoves: Infinity };
  findMinimumPins(board, 0, gameState);
  console.log(gameState.minPins, gameState.minMoves);

  // 테스트 케이스 사이의 빈 줄 처리
  if (testCase < T - 1) currentLine++;
}

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16197.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((row) => row.trim().split(""));
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

// 동전 위치 찾기
const coins = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "o") {
      coins.push([i, j]); // 동전 위치를 배열에 저장
      board[i][j] = "."; // 동전 위치는 비어 있는 곳으로 변경
    }
  }
}

let answer = Infinity; // 동전이 떨어진 최소 횟수

// 동전 이동
function moveCoins(coin1, coin2, moves) {
  if (moves > 10) return; // 10번 이상 움직이면 종료

  for (let i = 0; i < 4; i++) {
    const [dx, dy] = directions[i];

    let newCoin1 = [coin1[0] + dx, coin1[1] + dy];
    let newCoin2 = [coin2[0] + dx, coin2[1] + dy];

    const isCoin1Valid = isValidMove(newCoin1);
    const isCoin2Valid = isValidMove(newCoin2);

    // 하나만 유효한 경우 동전이 떨어졌으므로 종료
    if (isCoin1Valid !== isCoin2Valid) {
      answer = Math.min(answer, moves);
      return;
    }

    // 둘 다 유효한 경우
    if (isCoin1Valid && isCoin2Valid) {
      // 벽이면 이전 위치로 변경
      if (board[newCoin1[0]][newCoin1[1]] === "#") newCoin1 = coin1;
      if (board[newCoin2[0]][newCoin2[1]] === "#") newCoin2 = coin2;

      // 두 동전이 다른 위치라면 이동
      if (newCoin1[0] !== newCoin2[0] || newCoin1[1] !== newCoin2[1]) {
        moveCoins(newCoin1, newCoin2, moves + 1);
      }
    }
  }
}

// 유효한 이동인지 체크하는 함수
function isValidMove([x, y]) {
  return x >= 0 && x < N && y >= 0 && y < M;
}

moveCoins(coins[0], coins[1], 1);

console.log(answer === Infinity ? -1 : answer);

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21923.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = input.slice(1).map((v) => v.split(" ").map(Number));

const dp_up = Array.from({ length: n }, () => Array(m).fill(-Infinity)); // 출발지 -> i,j까지 상승 비행 최대 점수
const dp_down = Array.from({ length: n }, () => Array(m).fill(-Infinity)); // i,j -> 목적지까지 하강 비행 최대 점수
// 출발지, 목적지 점수로 처음 초기화
dp_up[n - 1][0] = board[n - 1][0];
dp_down[n - 1][m - 1] = board[n - 1][m - 1];

// 상승 비행
for (let i = n - 1; i >= 0; i--) {
  for (let j = 0; j < m; j++) {
    if (i === n - 1 && j === 0) continue; // 처음 출발지점 건너 뛰기
    if (i < n - 1)
      // 위로 이동
      dp_up[i][j] = Math.max(dp_up[i][j], dp_up[i + 1][j] + board[i][j]);
    if (j > 0)
      // 앞으로 이동
      dp_up[i][j] = Math.max(dp_up[i][j], dp_up[i][j - 1] + board[i][j]);
  }
}

// 하강 비행 (목적지 => i,j로 거꾸로 이동)
for (let i = n - 1; i >= 0; i--) {
  for (let j = m - 1; j >= 0; j--) {
    if (i === n - 1 && j === m - 1) continue; // 처음 도착지점 건너 뛰기
    if (i < n - 1)
      // 위로 이동
      dp_down[i][j] = Math.max(dp_down[i][j], dp_down[i + 1][j] + board[i][j]);
    if (j < m - 1)
      // 뒤로 이동
      dp_down[i][j] = Math.max(dp_down[i][j], dp_down[i][j + 1] + board[i][j]);
  }
}

console.log(dp_down);

let answer = -Infinity;

// 출발지 -> i,j -> 목적지 까지의 최대 값을 구함
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    answer = Math.max(answer, dp_up[i][j] + dp_down[i][j]);
  }
}

console.log(answer);

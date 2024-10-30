const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17370.txt"
  )
  .toString()
  .trim();

const n = +input;
let ans = 0;

const dx = [-1, -1, 1, 1, 1, -1];
const dy = [0, 1, 1, 0, -1, -1];

const dir = [
  [1, 5],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [0, 4],
];

const board = Array.from({ length: 100 }, () => Array(100).fill(0));

function dfs(x, y, cnt, d) {
  if (cnt === n) {
    if (board[x][y]) ans++;
    return;
  }
  if (board[x][y]) return;

  board[x][y] = 1;

  dfs(x + dx[dir[d][0]], y + dy[dir[d][0]], cnt + 1, dir[d][0]);
  dfs(x + dx[dir[d][1]], y + dy[dir[d][1]], cnt + 1, dir[d][1]);

  board[x][y] = 0;
}

// 시작 위치 설정
board[51][50] = 1;
dfs(50, 50, 0, 0);
console.log(ans);

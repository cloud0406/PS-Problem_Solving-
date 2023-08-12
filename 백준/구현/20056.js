const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/20056.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
let board = Array.from(Array(n), () => Array.from(Array(n), () => []));

for (let i = 0; i < m; i++) {
  const [r, c, m, s, d] = input.shift().split(" ").map(Number);
  board[r - 1][c - 1].push([m, s, d]);
}
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];

for (let i = 0; i < k; i++) {
  let nextBoard = Array.from(Array(n), () => Array.from(Array(n), () => []));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      for (let [m, s, d] of board[r][c]) {
        let r2 = (r + s * dr[d]) % n;
        let c2 = (c + s * dc[d]) % n;
        if (r2 < 0) r2 += n;
        if (c2 < 0) c2 += n;
        nextBoard[r2][c2].push([m, s, d]);
      }
    }
  }

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (nextBoard[r][c].length > 1) {
        let newfireballs = [];
        let mass = 0;
        let speed = 0;
        let even = 0;
        let count = 0;

        for (let [m, s, d] of nextBoard[r][c]) {
          mass += m;
          speed += s;
          count++;
          if (d % 2 == 0) even++;
        }
        mass = (mass / 5) | 0;
        speed = (speed / count) | 0;
        nd = even == count || even == 0 ? [0, 2, 4, 6] : [1, 3, 5, 7];

        if (mass > 0) {
          for (let d of nd) {
            newfireballs.push([mass, speed, d]);
          }
        }
        nextBoard[r][c] = newfireballs;
      }
    }
  }
  board = nextBoard;
}
const sum = (board) => {
  let answer = 0;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      for (let [m, s, d] of board[r][c]) {
        answer += m;
      }
    }
  }
  return answer;
};

console.log(sum(board));

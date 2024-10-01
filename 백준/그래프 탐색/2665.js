const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/2665.txt"
  )
  .toString()
  .trim()
  .split("\n");

const solution = function (input) {
  const n = parseInt(input.shift());
  const board = [];
  const dp = [];
  for (const row of input) {
    board.push(Array.from(row).map((e) => parseInt(e)));
    dp.push(Array.from({ length: n }, () => Infinity));
  }

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const q = [[0, 0]];
  dp[0][0] = 0;

  while (q.length > 0) {
    const [x, y] = q.shift();

    for (const [a, b] of direction) {
      const [nx, ny] = [x + a, y + b];
      if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
        if (board[nx][ny] === 1) {
          if (dp[nx][ny] > dp[x][y]) {
            dp[nx][ny] = dp[x][y];
            q.push([nx, ny]);
          }
        } else {
          if (dp[nx][ny] > dp[x][y] + 1) {
            dp[nx][ny] = dp[x][y] + 1;
            q.push([nx, ny]);
          }
        }
      }
    }
  }
  console.log(dp[n - 1][n - 1]);
};

solution(input);

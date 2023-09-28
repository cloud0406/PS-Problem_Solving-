const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16926.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, R] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, R, arr) {
  const rotate = (N, M, arr) => {
    for (let k = 0; k < Math.min(N, M) / 2; k++) {
      const row = N - k - 1;
      const col = M - k - 1;

      const start = arr[k][k];

      // 맨 윗행
      for (let i = k; i < col; i++) {
        arr[k][i] = arr[k][i + 1];
      }

      // 맨 오른쪽 열
      for (let i = k; i < row; i++) {
        arr[i][col] = arr[i + 1][col];
      }

      // 맨 아래 행
      for (let i = col; i > k; i--) {
        arr[row][i] = arr[row][i - 1];
      }

      // 맨 왼쪽 열
      for (let i = row; i > k; i--) {
        arr[i][k] = arr[i - 1][k];
      }

      arr[k + 1][k] = start;
    }
  };

  for (let i = 0; i < R; i++) {
    rotate(N, M, arr);
  }

  arr.map((row) => {
    console.log(row.join(" "));
  });
}

solution(N, M, R, arr);

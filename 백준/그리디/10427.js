const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10427.txt"
  )
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(T, arr) {
  for (let testCase = 0; testCase < T; testCase++) {
    let answer = 0;

    const tmp = arr[testCase];
    const n = tmp[0];
    const A = tmp
      .slice(1)
      .map((str) => parseInt(str))
      .sort((a, b) => a - b);
    const sum = new Array(tmp.length).fill(0);

    for (let i = 1; i < sum.length; i++) {
      sum[i] = sum[i - 1] + A[i - 1];
    }

    for (let m = 2; m <= n; m++) {
      let min = Infinity;

      for (let i = 0; i <= n - m; i++) {
        min = Math.min(min, A[i + m - 1] * m - (sum[i + m] - sum[i]));
      }

      answer += min;
    }

    console.log(answer);
  }
}

solution(T, arr);

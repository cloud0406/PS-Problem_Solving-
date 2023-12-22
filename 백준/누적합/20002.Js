const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20002.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, arr) {
  let answer = -Infinity;
  const sums = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

  // 누적 합 구하기
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      sums[i][j] =
        sums[i - 1][j] +
        sums[i][j - 1] -
        sums[i - 1][j - 1] +
        arr[i - 1][j - 1];
    }
  }

  // i,j 부터 i+k,j+k 지점까지 총이익 구하기
  for (let k = 0; k < N; k++) {
    for (let i = 1; i <= N - k; i++) {
      for (let j = 1; j <= N - k; j++) {
        const profit =
          sums[i + k][j + k] -
          sums[i - 1][j + k] -
          sums[i + k][j - 1] +
          sums[i - 1][j - 1];

        if (answer < profit) answer = profit;
      }
    }
  }

  return answer;
}

console.log(solution(N, arr));

// 파일에서 입력을 읽어오기
const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2616.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const data = input[1].split(" ").map(Number);
const max = +input[2];

const prefixSum = [0];
// memo 2차원 배열 생성
const memo = Array.from({ length: 4 }, () => Array(N + 1).fill(0));

// prefix sum 생성
for (let i = 1; i <= N; i++) {
  prefixSum[i] = prefixSum[i - 1] + data[i - 1];
}

// 점화식 생성
for (let i = 1; i <= 3; i++) {
  // i = 소형 기관차 번호
  for (let j = i * max; j <= N; j++) {
    // j = 소형 기관차가 운송을 시작할 수 있는 객차 번호
    memo[i][j] = Math.max(
      memo[i][j - 1],
      memo[i - 1][j - max] + (prefixSum[j] - prefixSum[j - max])
    );
  }
}

console.log(memo[3][N]);

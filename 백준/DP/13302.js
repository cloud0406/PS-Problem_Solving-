const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13302.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let holidays = new Set();
if (M > 0) holidays = new Set(input[1].split(" ").map(Number));

const INF = Infinity;
// 여유있게 체크하기 위해 110까지 길이 생성
const dp = Array.from({ length: 110 }, () => Array(110).fill(INF));
dp[0][0] = 0; // [day][coupon]

for (let i = 0; i <= N; i++) {
  for (let j = 0; j < 40; j++) {
    if (dp[i][j] === INF) continue;

    const result = dp[i][j];

    // 리조트에 가지 못하는 경우
    if (holidays.has(i + 1)) {
      dp[i + 1][j] = Math.min(dp[i + 1][j], result);
    }

    // 쿠폰이 3개 이상 있는 경우
    if (j >= 3) {
      dp[i + 1][j - 3] = Math.min(dp[i + 1][j - 3], result);
    }

    // 1일권을 구매하는 경우
    dp[i + 1][j] = Math.min(dp[i + 1][j], result + 10000);

    // 3일권을 구매하는 경우
    for (let k = 1; k <= 3; k++) {
      if (i + k <= N) {
        dp[i + k][j + 1] = Math.min(dp[i + k][j + 1], result + 25000);
      }
    }

    // 5일권을 구매하는 경우
    for (let k = 1; k <= 5; k++) {
      if (i + k <= N) {
        dp[i + k][j + 2] = Math.min(dp[i + k][j + 2], result + 37000);
      }
    }
  }
}

let answer = INF;
for (let j = 0; j < 40; j++) {
  answer = Math.min(answer, dp[N][j]);
}

console.log(answer);

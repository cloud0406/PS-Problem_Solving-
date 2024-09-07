const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14863.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const walk = new Array(n + 1).fill(0).map(() => [0, 0]);
const bike = new Array(n + 1).fill(0).map(() => [0, 0]);

for (let i = 1; i <= n; i++) {
  let [a, b, c, d] = input[i].split(" ").map(Number);
  walk[i] = [a, b]; // 걸을 때 소요 시간, 만족도
  bike[i] = [c, d]; // 자전거를 탈 때 소요 시간, 만족도
}

let dp = new Array(n + 1).fill(0).map(() => new Array(k + 1).fill(0));

// 첫 번째 날의 처리
dp[1][walk[1][0]] = walk[1][1];
dp[1][bike[1][0]] = Math.max(dp[1][bike[1][0]], bike[1][1]);

// 동적 계획법 실행
for (let i = 2; i <= n; i++) {
  for (let j = 1; j <= k; j++) {
    if (dp[i - 1][j]) {
      // 걸을 때
      if (j + walk[i][0] <= k) {
        dp[i][j + walk[i][0]] = Math.max(
          dp[i][j + walk[i][0]],
          dp[i - 1][j] + walk[i][1]
        );
      }
      // 자전거를 탈 때
      if (j + bike[i][0] <= k) {
        dp[i][j + bike[i][0]] = Math.max(
          dp[i][j + bike[i][0]],
          dp[i - 1][j] + bike[i][1]
        );
      }
    }
  }
}

// 최댓값 계산
let ans = 0;
for (let i = 1; i <= k; i++) {
  ans = Math.max(ans, dp[n][i]);
}

console.log(ans);

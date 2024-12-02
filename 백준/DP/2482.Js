const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2482.txt"
  )
  .toString()
  .trim()
  .split("\n");

const MOD = 1_000_000_003;

const n = +input[0];
const k = +input[1];

// dp[i][j]: i개의 색 중 j개를 선택하는 경우의 수
const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
  dp[i][1] = i; // i개 중에서 1개를 선택하는 방법은 i개
  dp[i][0] = 1; // 0개를 선택한 경우는 1로 초기화 (점화식을 위해)
}

// i가 3미만인 경우는 계산할 필요가 없음
for (let i = 3; i <= n; i++) {
  // n개의 수 중 n/2개 보다 더 많이 고르는 경우는 0가지
  for (let j = 2; j <= (i + 1) / 2; j++) {
    // i번째 색을 선택하지 않은 경우 + i번째 색을 선택한 경우
    dp[i][j] = (dp[i - 1][j] + dp[i - 2][j - 1]) % MOD;
  }
}

// n번째 색을 선택한 경우 + n번째 색을 선택하지 않은 경우
const result = (dp[n - 3][k - 1] + dp[n - 1][k]) % MOD;
console.log(result);

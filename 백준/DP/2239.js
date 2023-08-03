const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2239.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number);

function soloution(n, k, coins) {
  const dp = Array(k + 1).fill(0);

  dp[0] = 1;

  // 각 코인들을 순회하면서 각 동전별로 k원까지 가는 dp 테이블 작성
  // 첫 번째 코인 하나로 만들 수 있는 코인의 경우를 dp 테이블에 작성
  // 두 번째 코인부터는 이전 경우의 수를 참고하며 dp 테이블 갱신
  for (let coin of coins) {
    for (let j = coin; j < k + 1; j++) {
      dp[j] += dp[j - coin];
    }
    console.log(dp);
  }

  return dp[k];
}

console.log(soloution(n, k, coins));

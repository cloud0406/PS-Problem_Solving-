const input = require("fs")
  .readFileSync(
    process.platform === `linux` ? `/dev/stdin` : __dirname + "/input/5575.txt"
  )
  .toString()
  .split("\n");

const N = +input[0];
const nums = input[1].split(" ").map(Number);

function solution(N, nums) {
  const dp = Array.from({ length: N + 1 }, () => Array(21).fill(BigInt(0)));

  // dp[연산 횟수][만들 값] = 만들 수 있는 개수 카운팅
  dp[0][nums[0]] = BigInt(1);

  for (let cnt = 1; cnt < N; cnt++) {
    for (let value = 0; value <= 20; value++) {
      prevCnt = dp[cnt - 1][value]; // 반복문 돌면서 이전 연산 횟수로 만들 수 있는 값들의 개수 확인

      if (prevCnt > 0) {
        if (value - nums[cnt] >= 0)
          dp[cnt][value - nums[cnt]] += BigInt(prevCnt);

        if (value + nums[cnt] <= 20)
          dp[cnt][value + nums[cnt]] += BigInt(prevCnt);
      }
    }
  }

  return dp[N - 2][[nums[N - 1]]].toString();
}

console.log(solution(N, nums));

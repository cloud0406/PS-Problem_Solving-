const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2015.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution(N, K, arr) {
  let answer = 0;
  const dp = new Array(N + 1).fill(0);
  const map = new Map();

  for (let i = 1; i <= N; i++) {
    dp[i] = dp[i - 1] + arr[i - 1];
  }

  for (let i = 1; i <= N; i++) {
    if (dp[i] === K) answer++; // i까지 부분합이 K일때
    // j까지의 누적합을 dp[j]라 하고  'dp[i] - K = dp[j]'일 경우 -> 'dp[i] - dp[j] = K'
    // 즉 j~i까지의 누적합이 K라는 소리이므로 map에서 dp[j]의 가짓 수 만큼을 더한다
    if (map.has(dp[i] - K)) answer += map.get(dp[i] - K);

    // i까지 부분합이 종류별로 몇 개 있는지 map에 저장
    if (map.has(dp[i])) map.set(dp[i], map.get(dp[i]) + 1);
    else map.set(dp[i], 1);
  }

  return answer;
}

console.log(solution(N, K, arr));

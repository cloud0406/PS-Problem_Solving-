const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2631.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const data = [];

for (let i = 1; i <= N; i++) {
  data.push(+input[i]);
}

const solution = (N, data) => {
  const dp = new Array(N).fill(0);
  let maxLength = 0;

  for (let i = 0; i < N; i++) {
    dp[i] = 1; // 자신은 포함되어 있어야 하기 때문에
    for (let j = 0; j < i; j++) {
      if (data[i] > data[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
      }
    }
    if (maxLength < dp[i]) maxLength = dp[i];
  }

  console.log(N - maxLength);
};

solution(N, data);

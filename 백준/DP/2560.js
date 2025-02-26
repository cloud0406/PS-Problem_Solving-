const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2560.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [a, b, d, N] = input[0].split(" ").map(Number);

function solution(a, b, d, N) {
  const dp = new Array(N + 1).fill(0);

  for (let i = 0; i < a; i++) {
    dp[i] = 1;
  }

  // a ~ b 번식
  for (let i = a; i <= N; i++) {
    // a일째부터는 번식이 시작
    // dp[i] = dp[i-1] (전날의 짚신벌레 수) + dp[i-a] (a일 전에 태어난 짚신벌레들이 성체가 되어 번식한 짚신벌레 수)
    dp[i] = (dp[i - 1] + dp[i - a]) % 1000;

    // b일이 지난 벌레는 번식을 멈춤 -> b일 전에 태어난 짚신벌레가 만든 개체 수
    if (i >= b) dp[i] = (dp[i] - dp[i - b] + 1000) % 1000;
  }

  // d일째부터는 벌레 죽음 -> d일 전에 태어난 벌레 뺴기
  if (N >= d) console.log((dp[N] - dp[N - d] + 1000) % 1000);
  else console.log(dp[N] % 1000);
}

solution(a, b, d, N);

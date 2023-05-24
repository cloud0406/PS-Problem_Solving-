const N = +require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10844.txt"
  )
  .toString()
  .trim();

function solution(N) {
  let answer = 0;

  // dp[n][i] = n자리 수이면서 i로 끝나는 수의 가짓 수 -> ex) dp[2][2] : 자리수가 2이면서 2로 끝나는 수 -> 12, 32이므로 배열에 2가 담김
  const dp = Array.from(new Array(N + 1), () => new Array(10));

  // N = 1,2 일때 경우
  dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  dp[2] = [1, 1, 2, 2, 2, 2, 2, 2, 2, 1];

  // N=3 이상일 경우
  for (let n = 3; n <= N; n++) {
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        // 0으로 끝나는 수
        dp[n][i] = dp[n - 1][i + 1] % 1000000000;
      } else if (i >= 1 && i <= 8) {
        // 1 ~ 8로 끝나는 수
        dp[n][i] = (dp[n - 1][i - 1] + dp[n - 1][i + 1]) % 1000000000;
      } else {
        // 9로 끝나는 수
        dp[n][i] = dp[n - 1][i - 1] % 1000000000;
      }
    }
  }

  answer = dp[N].reduce((acc, cur) => acc + cur, 0) % 1000000000;

  return answer;
}

console.log(solution(N));

const [n, ...input] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17070.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(N, board) {
  //dp[0][row][col] = 가로 파이프
  //dp[1][row][col] = 대각선 파이프
  //dp[2][row][col] = 세로 파이프
  const dp = Array.from({ length: 3 }, () =>
    Array.from({ length: N }, () => Array(N).fill(0))
  );

  dp[0][0][1] = 1;
  for (let i = 2; i < N; i++) {
    if (board[0][i] === 0) {
      dp[0][0][i] = dp[0][0][i - 1];
    }
  }

  //가로 파이프 = 이전에 설치한 파이프가 가로, 대각선일 때 가능
  //대각선 파이프 = 이전에 설치한 파이프가 대각선, 가로, 세로(모든 경우) 가능
  //세로 파이프 = 이전에 설치한 파이프가 새로, 대각선일 때 가능
  //모두 벽 없을 때 가능

  for (let row = 1; row < N; row++) {
    for (let col = 1; col < N; col++) {
      if (board[row][col] !== 0) continue;

      //대각선 파이프 추가
      if (board[row][col - 1] === 0 && board[row - 1][col] === 0) {
        dp[1][row][col] =
          dp[0][row - 1][col - 1] +
          dp[1][row - 1][col - 1] +
          dp[2][row - 1][col - 1];
      }

      //가로 파이프 추가
      if (board[row][col - 1] === 0) {
        dp[0][row][col] = dp[0][row][col - 1] + dp[1][row][col - 1];
      }

      //세로 파이프 추가
      if (board[row - 1][col] === 0) {
        dp[2][row][col] = dp[1][row - 1][col] + dp[2][row - 1][col];
      }
    }
  }

  return dp[0][N - 1][N - 1] + dp[1][N - 1][N - 1] + dp[2][N - 1][N - 1];
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(" ").map(Number))
);

console.log(answer);

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1633.txt"
  )
  .toString()
  .trim()
  .split("\n");

const players = input.map((line) => line.split(" ").map(Number));
const N = players.length;

// dp[i][w][b]: i번째 선수까지 고려했을 때, 백 선수 w명, 흑 선수 b명 선택한 경우의 최대값
const dp = Array.from({ length: N }, () =>
  Array.from({ length: 16 }, () => Array(16).fill(-1))
);

function solve(idx, white, black) {
  // 백팀 15명, 흑팀 15명 모두 선택한 경우
  if (white === 15 && black === 15) return 0;
  // 모든 선수를 고려한 경우
  if (idx === N) return 0;
  // 이미 계산한 경우
  if (dp[idx][white][black] !== -1) return dp[idx][white][black];

  let ret = solve(idx + 1, white, black); // 현재 선수를 선택하지 않는 경우

  // 백팀으로 선택하는 경우
  if (white < 15) {
    ret = Math.max(ret, solve(idx + 1, white + 1, black) + players[idx][0]);
  }
  // 흑팀으로 선택하는 경우
  if (black < 15) {
    ret = Math.max(ret, solve(idx + 1, white, black + 1) + players[idx][1]);
  }

  return (dp[idx][white][black] = ret);
}

console.log(solve(0, 0, 0));

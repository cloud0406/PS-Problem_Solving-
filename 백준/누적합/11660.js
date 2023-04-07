let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/11660.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const board = input.slice(1, n + 1).map((str) => str.split(" ").map(Number));
let dp = Array.from(Array(n + 1), () => new Array(n + 1).fill(0)); // (1,1) ~ (x, y) 지점까지의 구간 합을 담을 dp

// 구간합 배열
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    // 보드에 현재 값 + 구간합을 답은 dp 배열의 두 사각형을 더해준 후 겹치는 부분을 빼줌
    dp[i][j] =
      board[i - 1][j - 1] + dp[i][j - 1] + dp[i - 1][j] - dp[i - 1][j - 1];
  }
}

let ans = "";

for (let i = n + 1; i < input.length; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map(Number);
  //(1,1) ~ (x2,y2)에서 불필요한 구간 [(1,1)~(x1-1,y2) , (1,1)~(x2,y1-1)] 제거 후 제거할때 겹치는 부분[(1,1)~(x1-1,y1-1)] 다시 더해줌
  ans +=
    dp[x2][y2] - (dp[x1 - 1][y2] + dp[x2][y1 - 1]) + dp[x1 - 1][y1 - 1] + "\n";
}

console.log(ans);

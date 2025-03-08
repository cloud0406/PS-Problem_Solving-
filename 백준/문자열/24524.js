const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/24524.txt"
  )
  .toString()
  .trim()
  .split("\n");

const S = input[0];
const T = input[1];

// i번째 문자까지 만들 수 있는 부분 문자열의 개수
const dp = new Array(T.length + 1).fill(0);
dp[0] = Infinity;

const findIdx = {};
for (let i = 0; i < T.length; i++) {
  findIdx[T[i]] = i + 1;
}

for (const s of S) {
  // T에 존재하는 문자이고, 이전 문자의 수가 더 많은 경우
  if (findIdx[s] && dp[findIdx[s] - 1] > dp[findIdx[s]]) {
    dp[findIdx[s]]++;
  }
}

console.log(dp[T.length]);

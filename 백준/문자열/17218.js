const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17218.txt"
  )
  .toString()
  .trim()
  .split("\n");

const str1 = input[0];
const str2 = input[1];

const len1 = str1.length;
const len2 = str2.length;

const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

// LCS
for (let i = 0; i < len1; i++) {
  for (let j = 0; j < len2; j++) {
    if (str1[i] === str2[j]) {
      dp[i + 1][j + 1] = dp[i][j] + 1;
    } else {
      dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
    }
  }
}

// LCS 문자열 역추적
let result = "";
let i = len1;
let j = len2;

while (dp[i][j] !== 0) {
  if (dp[i][j] === dp[i - 1][j]) {
    i--;
  } else if (dp[i][j] === dp[i][j - 1]) {
    j--;
  } else {
    result = str1[i - 1] + result;
    i--;
    j--;
  }
}

console.log(result);

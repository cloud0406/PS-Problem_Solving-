const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21318.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);
arr.unshift(0);
const Q = +input[2];
const Qarr = input.slice(3).map((v) => v.split(" ").map(Number));

function soloution(N, arr, Q, Qarr) {
  let answer = [];
  let dp = Array.from({ length: N + 1 }, () => 0);

  // dp에 1번부터 해당 인덱스 다음 악보까지 쳤을때 실수하는 곡의 수를 누적합으로 담음
  for (let i = 1; i < N; i++) {
    if (arr[i] > arr[i + 1]) dp[i] = dp[i - 1] + 1;
    else dp[i] = dp[i - 1];
  }

  // 마지막 악보는 실수 없으니 제외, 시작 악보 이전까지의 누적합을 제외
  for (let [start, end] of Qarr) {
    answer.push(dp[end - 1] - dp[start - 1]);
  }

  return answer.join("\n");
}

console.log(soloution(N, arr, Q, Qarr));

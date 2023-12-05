const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10713.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const P = input[1].split(" ").map(Number);
const cost = input.slice(2).map((line) => line.split(" ").map(Number));

function solution(n, m, P, cost) {
  let sum = 0;
  let answer = 0;
  const arr = Array(n + 1).fill(0);

  for (let i = 0; i < m - 1; i++) {
    if (P[i] < P[i + 1]) {
      arr[P[i]] += 1;
      arr[P[i + 1]] -= 1;
    } else {
      arr[P[i + 1]] += 1;
      arr[P[i]] -= 1;
    }
  }

  console.log(arr);
  for (let i = 0; i < n - 1; i++) {
    sum += arr[i + 1];
    answer += Math.min(cost[i][0] * sum, cost[i][1] * sum + cost[i][2]);
    console.log(answer);
  }

  return answer;
}

console.log(solution(n, m, P, cost));

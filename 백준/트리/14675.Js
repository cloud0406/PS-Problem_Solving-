const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/14675.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1, N).map((v) => v.split(" ").map(Number));
const q = input.slice(N + 1).map((v) => v.split(" ").map(Number));

function solution(N, arr, q) {
  let answer = "";
  const graph = Array.from(Array(N + 1), () => new Array());

  for (let [from, to] of arr) {
    graph[from].push(to);
    graph[to].push(from);
  }

  for (let [t, k] of q) {
    if (t === 1) answer += graph[k].length > 1 ? "yes\n" : "no\n";
    else answer += "yes\n";
  }

  return answer;
}

console.log(solution(N, arr, q));

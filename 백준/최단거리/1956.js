const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1956.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [V, E] = input[0].split(" ").map(Number);
const city = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(V, E, city) {
  let answer = Infinity;

  const costs = Array.from(Array(V), () => Array(V).fill(Infinity));

  for (let [from, to, cost] of city) {
    costs[from - 1][to - 1] = cost;
  }

  for (let mid = 0; mid < V; mid++) {
    for (let start = 0; start < V; start++) {
      for (let end = 0; end < V; end++) {
        if (costs[start][mid] + costs[mid][end] < costs[start][end]) {
          costs[start][end] = costs[start][mid] + costs[mid][end];
        }
      }
    }
  }

  for (let start = 0; start < V; start++) {
    for (let end = 0; end < V; end++) {
      if (start == end) continue;
      if (costs[start][end] != Infinity && costs[end][start] != Infinity) {
        answer = Math.min(costs[start][end] + costs[end][start], answer);
      }
    }
  }

  if (answer == Infinity) return -1;
  else return answer;
}

console.log(solution(V, E, city));

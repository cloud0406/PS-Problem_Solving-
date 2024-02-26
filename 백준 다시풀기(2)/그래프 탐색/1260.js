const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1260.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, V] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));
const graph = Array.from({ length: N + 1 }, () => []);

for (let [from, to] of arr) {
  graph[from].push(to);
  graph[to].push(from);
}

function solution(N, M, V, graph) {
  const DFS = () => {
    const visited = Array(N + 1).fill(false);
    const stack = [V];
    let result = [];

    while (stack.length > 0) {
      const node = stack.pop();

      if (!visited[node]) {
        visited[node] = true;
        result.push(node);
        stack.push(...graph[node].sort((a, b) => b - a));
      }
    }

    console.log(result.join(" "));
  };

  const BFS = () => {
    const visited = Array(N + 1).fill(false);
    const stack = [V];
    let result = [];

    while (stack.length > 0) {
      const node = stack.shift();

      if (!visited[node]) {
        visited[node] = true;
        result.push(node);
        stack.push(...graph[node].sort((a, b) => a - b));
      }
    }

    console.log(result.join(" "));
  };

  DFS();
  BFS();
}

solution(N, M, V, graph);

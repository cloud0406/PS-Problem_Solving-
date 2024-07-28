const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1595.txt"
  )
  .toString()
  .trim()
  .split("\n");

const graph = {};
let maxCost = 0;
let maxNode = 0;
const visited = {};

const dfs = (node, cost) => {
  if (cost > maxCost) {
    maxCost = cost;
    maxNode = node;
  }

  visited[node] = true;

  if (graph[node]) {
    for (const [nextNode, nextCost] of graph[node]) {
      if (!visited[nextNode]) dfs(nextNode, cost + nextCost);
    }
  }
};

for (let line of input) {
  const [a, b, c] = line.split(" ").map(Number);
  if (!graph[a]) graph[a] = [];
  if (!graph[b]) graph[b] = [];
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

dfs(1, 0);

for (let key in visited) {
  visited[key] = false;
}

maxCost = 0;

dfs(maxNode, 0);

console.log(maxCost);

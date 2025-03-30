const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/12834.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;

const [n, v, e] = input[line++].split(" ").map(Number);
const [A, B] = input[line++].split(" ").map(Number);
const members = input[line++].split(" ").map(Number);

const graph = Array.from({ length: v + 1 }, () => []);

for (let i = 0; i < e; i++) {
  const [a, b, c] = input[line++].split(" ").map(Number);
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

let result = 0;

function dijkstra(start, graph, v) {
  const minDis = Array(v + 1).fill(Infinity);
  const pq = [[0, start]];
  minDis[start] = 0;

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [curDis, curNode] = pq.shift();

    if (minDis[curNode] < curDis) continue;

    for (const [nnode, ndis] of graph[curNode]) {
      if (minDis[nnode] > ndis + curDis) {
        minDis[nnode] = ndis + curDis;
        pq.push([ndis + curDis, nnode]);
      }
    }
  }

  return minDis;
}

for (const i of members) {
  const k = dijkstra(i, graph, v);
  const first = k[A];
  const second = k[B];

  let ans = 0;

  if (first === Infinity && second === Infinity) ans = -2;
  else if (first === Infinity) ans = -1 + second;
  else if (second === Infinity) ans = first + -1;
  else ans = first + second;

  result += ans;
}

console.log(result);

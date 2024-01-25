const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11657.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const edges = [];
const dist = Array(n + 1).fill(Infinity);

for (let i = 1; i <= m; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  edges.push([a, b, c]);
}

const bellmanFord = (start) => {
  dist[start] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < m; j++) {
      const [now, next, cost] = edges[j];

      if (dist[now] !== Infinity && dist[next] > dist[now] + cost) {
        dist[next] = dist[now] + cost;
        if (i === n) return true;
      }
    }
  }

  return false;
};

const negativeCycle = bellmanFord(1);

if (negativeCycle) console.log(-1);
else {
  for (let i = 2; i <= n; i++) {
    if (dist[i] === Infinity) console.log(-1);
    else console.log(dist[i]);
  }
}

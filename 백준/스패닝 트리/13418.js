const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13418.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const edges = [];
for (let i = 2; i <= M + 1; i++) {
  edges.push(input[i].split(" ").map(Number));
}
edges.map((item) => {
  item[2] = item[2] * -1 + 1;
});

edges.sort((a, b) => a[2] - b[2]);
let parents = Array.from(Array(N + 1), (_, i) => i);
let ranks = Array(N + 1).fill(1);

const find = (a) => {
  if (a === parents[a]) return a;
  return (parents[a] = find(parents[a]));
};

const union = (a, b) => {
  let aRoot = find(a);
  let bRoot = find(b);
  if (aRoot === bRoot) return false;
  if (ranks[aRoot] < ranks[bRoot]) [aRoot, bRoot] = [bRoot, aRoot];
  parents[bRoot] = aRoot;
  if (ranks[aRoot] === ranks[bRoot]) ranks[aRoot]++;
  return true;
};

let min = +input[1].split(" ")[2] * -1 + 1;
union(0, 1);
for (let i = 0; i < M; i++) {
  if (union(edges[i][0], edges[i][1])) {
    min += edges[i][2];
  }
}

parents = Array.from(Array(N + 1), (_, i) => i);
ranks = Array(N + 1).fill(1);
let max = +input[1].split(" ")[2] * -1 + 1;
union(0, 1);
for (let i = M - 1; i >= 0; i--) {
  if (union(edges[i][0], edges[i][1])) {
    max += edges[i][2];
  }
}

console.log(max ** 2 - min ** 2);

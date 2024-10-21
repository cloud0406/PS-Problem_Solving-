const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/11085.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [p, w] = input[0].split(" ").map(Number);
const [c, v] = input[1].split(" ").map(Number);

const parent = Array.from({ length: p + 1 }, (_, i) => i);
// 가중치 순으로 정렬 -> 너비가 가장 좁은 길의 너비를 최대화하기 위해
const edges = input
  .slice(2)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => b[2] - a[2]);

const findParent = (parent, x) => {
  if (parent[x] !== x) parent[x] = findParent(parent, parent[x]);
  return parent[x];
};

const union = (parent, a, b) => {
  const rootA = findParent(parent, a);
  const rootB = findParent(parent, b);

  if (rootA < rootB) parent[rootB] = rootA;
  else parent[rootA] = rootB;
};

// 가장 너비가 큰 길부터 차례로 연결하면서, c와 v가 연결되는 순간의 가장 작은 너비를 찾음
for (const [start, end, width] of edges) {
  if (findParent(parent, start) !== findParent(parent, end)) {
    union(parent, start, end);

    if (findParent(parent, c) === findParent(parent, v)) {
      console.log(width);
      break;
    }
  }
}

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1197.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [V, E] = input[0].split(" ").map(Number);
const edges = [];
for (let i = 0; i < E; i++) {
  const [from, to, C] = input[1 + i].split(" ").map((e) => parseInt(e));
  edges.push([from, to, C]);
}

function findParent(parent, x) {
  if (parent[x] !== x) parent[x] = findParent(parent, parent[x]);
  return parent[x];
}

function unionFind(parent, a, b) {
  a = findParent(parent, a);
  b = findParent(parent, b);

  if (a < b) parent[b] = a;
  else parent[a] = b;

  return parent;
}

function solution(V, E, edges) {
  let answer = 0;

  let parents = Array.from({ length: V + 1 });
  for (let i = 0; i <= V; i++) {
    parents[i] = i;
  }

  edges.sort((a, b) => a[2] - b[2]); // 가중치 순으로 정렬

  edges.forEach((edge) => {
    const [from, to, C] = edge;

    if (findParent(parents, from) !== findParent(parents, to)) {
      parents = unionFind(parents, from, to);
      answer += C;
    }
  });

  return answer;
}

console.log(solution(V, E, edges));

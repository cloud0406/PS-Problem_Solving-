const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16398.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const graph = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, graph) {
  let answer = 0;
  const edges = [];
  let parent = Array.from({ length: N }, (_, i) => i);

  const findParent = (x) => {
    if (parent[x] === x) return x;
    else return (parent[x] = findParent(parent[x]));
  };

  const unionFind = (a, b) => {
    a = findParent(a);
    b = findParent(b);

    if (a < b) parent[b] = a;
    else parent[a] = b;

    return parent;
  };

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      edges.push([graph[i][j], i, j]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  for (let [cost, from, to] of edges) {
    if (findParent(from) !== findParent(to)) {
      unionFind(from, to);
      answer += cost;
    }
  }

  return answer;
}

console.log(solution(N, graph));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1774.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const dots = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const path = input.slice(N + 1).map((v) => v.split(" ").map(Number));

function solution(N, M, dots, path) {
  const edges = [];
  const parent = [];

  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);

    return parent[x];
  };

  const union = (a, b) => {
    const minP = find(a);
    const maxP = find(b);
    parent[maxP] = minP;
  };

  for (let i = 0; i <= N; i++) {
    parent.push(i);
  }

  for (let [a, b] of path) {
    union(a, b);
  }

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (find(i + 1) !== find(j + 1)) {
        edges.push([
          Math.sqrt(
            (dots[i][0] - dots[j][0]) ** 2 + (dots[i][1] - dots[j][1]) ** 2
          ),
          i + 1,
          j + 1,
        ]);
      }
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  let result = 0;

  for (let i = 0; i < edges.length; i++) {
    const [w, a, b] = edges[i];
    if (find(a) !== find(b)) {
      union(a, b);
      result += w;
    }
  }

  return result.toFixed(2);
}

console.log(solution(N, M, dots, path));

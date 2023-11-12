const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/14621.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const school = input[1].split(" ");
const edges = [];

for (let i = 0; i < m; i++) {
  const [u, v, d] = input[i + 2].split(" ").map(Number);
  edges.push([d, u - 1, v - 1]);
}

edges.sort((a, b) => a[0] - b[0]);

function solution(n, m, edges, school) {
  let answer = 0;
  let cnt = 0;
  const parent = Array.from({ length: n }, (_, i) => i);

  const find_parent = (parent, x) => {
    if (parent[x] !== x) parent[x] = find_parent(parent, parent[x]);

    return parent[x];
  };

  const union = (parent, a, b) => {
    a = find_parent(parent, a);
    b = find_parent(parent, b);

    if (a < b) parent[b] = a;
    else parent[a] = b;
  };

  for (const [d, u, v] of edges) {
    if (
      school[u] !== school[v] &&
      find_parent(parent, u) !== find_parent(parent, v)
    ) {
      union(parent, u, v);
      answer += d;
      cnt += 1;
    }
    if (cnt === n - 1) break;
  }

  if (cnt === n - 1) return answer;
  else return -1;
}

console.log(solution(n, m, edges, school));

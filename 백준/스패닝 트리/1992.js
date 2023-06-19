const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1992.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const M = +input[1];

const edges = [];
for (let i = 0; i < M; i++) {
  const [from, to, C] = input[2 + i].split(" ").map(Number);
  edges.push([from, to, C]);
}

// 부모 찾기
function findParent(parent, x) {
  if (parent[x] !== x) parent[x] = findParent(parent, parent[x]);
  return parent[x];
}

// 더 작은 값으로 부모 변경
function unionFind(parent, a, b) {
  a = findParent(parent, a);
  b = findParent(parent, b);

  if (a < b) parent[b] = a;
  else parent[a] = b;

  return parent;
}

function solution(N, M, edges) {
  let answer = 0;

  // 부모로 자기 자신을 담아둠 (연결 전)
  let parents = Array.from({ length: N + 1 });
  for (let i = 0; i <= N; i++) {
    parents[i] = i;
  }

  edges.sort((a, b) => a[2] - b[2]); // 가중치 순으로 정렬

  edges.forEach((edge) => {
    const [from, to, cost] = edge;

    if (findParent(parents, from) !== findParent(parents, to)) {
      parents = unionFind(parents, from, to);
      answer += cost;
    }
  });

  return answer;
}

console.log(solution(N, M, edges));

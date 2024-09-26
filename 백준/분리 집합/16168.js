const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16168.txt"
  )
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const [V, E] = input[idx++].split(" ").map(Number);

const graph = Array.from({ length: 3001 }, () => []);
for (let i = 0; i < E; i++) {
  const [from, to] = input[idx++].split(" ").map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

// 노드 중 간선이 가장 많은 노드를 찾아 sIdx로 저장
let sIdx = 1;
let max_size = 0;
for (let i = 1; i <= V; i++) {
  const size = graph[i].length;
  if (size > max_size) {
    max_size = size;
    sIdx = i;
  }
}

// 노드, 간선 수가 주어졌을 때 dfs로 모든 간선을 지울 수 있는지 확인
function dfs(x, count) {
  if (count >= E) {
    for (let i = 1; i <= V; i++) {
      if (graph[i].length !== 0) return false;
    }

    return true;
  }

  let ans = false;

  // 노드 x에 연결되어 있는 노드의 리스트를 하나씩 호출하면서 간선을 지워나감
  for (let i = 0; i < graph[x].length; i++) {
    const next = graph[x][i];
    graph[x].splice(i, 1); // 제거

    // 상호연결된 노드의 간선도 제거
    const idx = graph[next].indexOf(x);
    graph[next].splice(idx, 1);
    ans = ans || dfs(next, count + 1);
    i--;
  }
  return ans;
}

const ans = dfs(sIdx, 0);
console.log(ans ? "YES" : "NO");

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/13023.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  let answer = 0;
  const graph = Array.from({ length: N }, () => []);
  const visited = Array.from({ length: N }, () => false);

  for (let [from, to] of arr) {
    graph[from].push(to);
    graph[to].push(from);
  }

  const dfs = (idx, L) => {
    if (answer === 1) return;

    if (L === 4) return (answer = 1);

    for (let node of graph[idx]) {
      if (visited[node]) continue;

      visited[node] = true;
      dfs(node, L + 1);
      visited[node] = false;
    }
  };

  // 0부터 방문 -> 각 시작점으로부터 depth 확인
  for (let i = 0; i < N; i++) {
    visited[i] = true;
    dfs(i, 0);
    if (answer === 1) break;
    visited[i] = false;
  }

  return answer;
}

console.log(solution(N, M, arr));

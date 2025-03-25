const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21738.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, s, p] = input[0].split(" ").map(Number);
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < n; i++) {
  const [from, to] = input[i].split(" ").map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

// bfs로 지지대 얼음까지 최단 경로인 2가지 경우를 찾음 -> 최단 경로 2개의 총 길이 리턴
function bfs(start, graph, n, s) {
  let cnt = 0;
  let sumDist = 0;
  const q = [[start, 0]]; // [현재 얼음, 거리]
  const visited = Array(n + 1).fill(false);
  visited[start] = true;

  let index = 0;

  while (index < q.length) {
    const [cur, dist] = q[index++];

    // 최단경로 2개 체크
    if (cnt < 2) {
      if (cur <= s) {
        cnt++;
        sumDist += dist;
      }
    } else break;

    for (const next of graph[cur]) {
      if (!visited[next]) {
        visited[next] = true;
        q.push([next, dist + 1]);
      }
    }
  }

  return sumDist;
}

// 전체 얼음 - 최단경로2개의 총길이 - 펭귄서있는얼음
console.log(n - bfs(p, graph, n, s) - 1);

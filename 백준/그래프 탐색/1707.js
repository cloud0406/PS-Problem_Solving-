const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1707.txt"
  )
  .toString()
  .trim()
  .split("\n");

function solution(v, e, edges) {
  // 이분 그래프 체크
  // 시작 정점에서 출발하여 인접한 정점들을 번갈아가며 다른 그룹으로 마킹
  // 만약 같은 그룹으로 마킹된 정점을 발견하면 "NO"를 반환
  const bfs = (s, marks) => {
    const q = [[s, true]];
    let front = 0;
    marks[s] = true;

    while (q[front]) {
      const [now, m] = q[front++]; // 현재 정점, 그룹(true or false)
      for (const v of graph[now]) {
        // 현재 정점에서 인접한 정점이 같은 그룹이라면 이분 그래프 X
        if (marks[v] === m) return false;
        // 다른 그룹 & 방문하지 않은 정점이라면 반대로 마킹
        else if (marks[v] === -1) {
          marks[v] = !m;
          q.push([v, !m]);
        }
      }
    }

    return true;
  };

  const graph = Array.from({ length: v + 1 }, () => []);
  const marks = Array(v + 1).fill(-1); // 미방문 상태: -1, 그룹1: true, 그룹2: false
  edges.forEach((edge) => {
    const [a, b] = edge;
    graph[a].push(b);
    graph[b].push(a);
  });

  let result = "YES";
  // 모든 정점에 대해 이분 그래프 체크
  for (let i = 1; i <= v; i += 1) {
    if (graph[i] && marks[i] === -1 && !bfs(i, marks)) {
      result = "NO";
      break;
    }
  }
  return result;
}

function main() {
  const t = +input[0];
  let idx = 1;
  let result = "";

  for (let i = 0; i < t; i += 1) {
    const [v, e] = input[idx++].split(" ").map(Number);
    const edges = input
      .slice(idx, idx + e)
      .map((v) => v.split(" ").map(Number));

    idx += e;
    result += solution(v, e, edges) + "\n";
  }

  console.log(result);
}

main();

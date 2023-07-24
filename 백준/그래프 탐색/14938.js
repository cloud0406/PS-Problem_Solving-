const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/14938.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = input[0].split(" ").map(Number);
const items = input[1].split(" ").map(Number);
const arr = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(n, m, r, items, arr) {
  let answer = 0;

  const graph = Array.from({ length: n + 1 }, () =>
    Array(n + 1).fill(Infinity)
  );

  for (let [from, to, l] of arr) {
    graph[from][to] = l;
    graph[to][from] = l;
  }

  // 플로이드 와샬로 중간지점을 통해 갈 수 있는 곳 최단거리로 갱신
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        // '출발지점 = 도착지점' 인 곳은 거리 0
        if (i === j) {
          graph[i][j] = 0;
          continue;
        }

        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  // 1번 지역부터 수색범위내에 갈 수 있는 지역을 탐색하며 아이템 최대 개수 갱신
  for (let from = 1; from <= n; from++) {
    let total = 0;
    for (let to = 1; to <= n; to++) {
      // 도착 지점이 수색범위 내에 있다면 도착지점에서 얻을 수 있는 아이템 더해줌
      if (graph[from][to] <= m) total += items[to - 1];
    }

    answer = Math.max(total, answer);
  }

  return answer;
}

console.log(solution(n, m, r, items, arr));

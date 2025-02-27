const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21940.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;

const [N, M] = input[line++].split(" ").map(Number);
const edges = [];
for (let i = 0; i < M; i++) {
  edges.push(input[line++].split(" ").map(Number));
}
const K = +input[line++];
const C = input[line++].split(" ").map(Number);

function solution(N, edges, K, C) {
  const graph = Array.from({ length: N + 1 }, () =>
    Array(N + 1).fill(Infinity)
  );

  for (const [A, B, T] of edges) {
    graph[A][B] = T;
  }

  for (let i = 1; i <= N; i++) {
    graph[i][i] = 0;
  }

  for (let k = 1; k <= N; k++) {
    for (let j = 1; j <= N; j++) {
      for (let i = 1; i <= N; i++) {
        if (graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }

  // 최대 왕복시간 계산
  const cities = new Array(N + 1).fill(0);
  for (let X = 1; X <= N; X++) {
    // 왕복 시간 계산
    cities[X] = C.reduce((maxTime, friendCity) => {
      if (
        friendCity === X ||
        graph[friendCity][X] === Infinity ||
        graph[X][friendCity] === Infinity
      ) {
        return maxTime;
      }

      // 왕복 시간과 현재 최대값 중 큰 값 선택
      return Math.max(maxTime, graph[X][friendCity] + graph[friendCity][X]);
    }, 0);
  }

  // 최소 왕복시간을 가진 도시들 찾기
  const minTime = Math.min(...cities.slice(1));
  const answer = Array.from({ length: N }, (_, i) => i + 1)
    .filter((X) => cities[X] === minTime)
    .sort((a, b) => a - b);

  return answer;
}

const result = solution(N, edges, K, C);
console.log(result.join(" "));

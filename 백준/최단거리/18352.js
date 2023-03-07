const input = require("fs")
  .readFileSync(__dirname + "/input/18352.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, K, X] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => Array());

// X 부터 해당 인덱스까지 최단 거리를 기록할 dp 배열
const dp = Array.from({ length: N + 1 }, () => Infinity);

for (let i = 0; i < M; i++) {
  let [start, end] = input[i + 1].split(" ").map(Number);
  graph[start].push(end);
}

function bfs() {
  const queue = [X]; // 출발 도시 넣어줌
  dp[X] = 0;

  while (queue.length) {
    let cur = queue.shift();

    graph[cur].map((next) => {
      let cost = dp[cur] + 1;

      // && 오른쪽 로직 없으면 시간초과
      if (dp[next] > cost && cost <= K) {
        dp[next] = cost;
        queue.push(next);
      }
    });
  }
}

bfs();

// 최단 거리 K인 도시 있나 없나 체크용
let ans = false;

for (let i = 1; i <= N; i++) {
  if (dp[i] == K) {
    console.log(i);
    ans = true;
  }
}

if (!ans) console.log(-1);

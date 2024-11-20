const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11562.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

// 그래프 초기화
const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));
for (let i = 1; i <= n; i++) {
  graph[i][i] = 0; // 자기 자신으로의 거리는 0
}

// from -> to로 가기 위한 '간선 방향 변경 횟수' 저장
// 양방향은 이미 이동가능하므로 0, 단방향은 반대 방향의 길을 양방향으로 한 번 바꾸면 되므로 1
for (let i = 1; i <= m; i++) {
  const [from, to, b] = input[i].split(" ").map(Number);
  if (b === 0) {
    graph[from][to] = 0;
    graph[to][from] = 1;
  } else {
    graph[from][to] = 0;
    graph[to][from] = 0;
  }
}

// 경로 최적화
for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (graph[i][j] > graph[i][k] + graph[k][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}

// 질문 처리
const answers = [];
const questions = input.slice(m + 2).map((v) => v.split(" ").map(Number));
for (let [from, to] of questions) {
  answers.push(graph[from][to]);
}

console.log(answers.join("\n"));

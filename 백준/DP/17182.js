const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17182.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const times = input.slice(1).map((v) => v.split(" ").map(Number));

const visited = new Array(N).fill(0);
visited[K] = true; // 시작점 방문 처리

let answer = Infinity;

// 플로이드 와샬
for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      times[i][j] = Math.min(times[i][j], times[i][k] + times[k][j]);
    }
  }
}

// 최소 비용 찾기
function findMinTime(cur, cost, cnt) {
  if (cnt === N) {
    answer = Math.min(answer, cost);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      findMinTime(i, cost + times[cur][i], cnt + 1);
      visited[i] = false;
    }
  }
}

findMinTime(K, 0, 1);

console.log(answer);

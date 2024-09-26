const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2458.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const students = input.slice(1).map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N }, () => Array(N).fill(false));

students.forEach(([from, to]) => {
  graph[from - 1][to - 1] = true;
});

// 정해진 테이블에서 추가로 알 수 있는 사항들 플로이드 와샬로 반영
for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][k] && graph[k][j]) {
        graph[i][j] = true;
      }
    }
  }
}

let answer = 0;

for (let i = 0; i < N; i++) {
  let cnt = 0;
  for (let j = 0; j < N; j++) {
    if (i !== j && (graph[i][j] || graph[j][i])) cnt++;
  }

  // 해당 학생이 자신의 키가 몇 번째인지 알 수 있는 경우 (다른 학생들과 직접적 또는 간접적으로 연결된 경우)
  if (cnt === N - 1) answer++;
}

console.log(answer);

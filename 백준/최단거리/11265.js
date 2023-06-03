const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11265.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let times = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
let questions = input.slice(N + 1).map((v) => v.split(" ").map(Number));

function solution(N, M, times, questions) {
  // 플로이드 와샬로 경로 경유해서 짧게 갈 수 있으면 최단 거리 갱신
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (times[i][j] > times[i][k] + times[k][j])
          times[i][j] = times[i][k] + times[k][j];
      }
    }
  }

  for (let [from, to, time] of questions) {
    if (times[from - 1][to - 1] <= time) console.log("Enjoy other party");
    else console.log("Stay here");
  }
}

solution(N, M, times, questions);

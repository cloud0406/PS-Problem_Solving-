const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11265.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const times = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const numbers = input.slice(N + 1).map((v) => v.split(" ").map(Number));

function solution(N, M, times, numbers) {
  // 플로이드 와샬을 통한 최단 거리 갱신
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (times[i][k] + times[k][j] < times[i][j])
          times[i][j] = times[i][k] + times[k][j];
      }
    }
  }

  for (let [from, to, time] of numbers) {
    if (times[from - 1][to - 1] <= time) console.log("Enjoy other party");
    else console.log("Stay here");
  }
}

solution(N, M, times, numbers);

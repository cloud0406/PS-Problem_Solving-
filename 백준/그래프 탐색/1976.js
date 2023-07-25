const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1976.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const M = +input[1];
const city = input.slice(2, -1).map((v) => v.split(" ").map(Number));
const schedule = input.slice(-1)[0].split(" ").map(Number);

function solution(N, M, city, schedule) {
  let answer = true;

  // 본인 도시 연결
  for (let i = 0; i < N; i++) {
    city[i][i] = 1;
  }

  // 만약 중간 지점을 경유하여 i -> j로 갈 수 있다면 1로 표시
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (city[i][k] && city[k][j]) city[i][j] = 1;
      }
    }
  }

  // 여행 경로를 탐색
  for (let i = 0; i < schedule.length - 1; i++) {
    if (city[schedule[i] - 1][schedule[i + 1] - 1] === 0) {
      answer = false;
      break;
    }
  }

  if (answer) console.log("YES");
  else console.log("NO");
}

solution(N, M, city, schedule);

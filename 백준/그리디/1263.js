const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1263.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const times = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => b[1] - a[1]); // 마감 시간 기준으로 내림차순 정렬

function solution() {
  let answer = 1000000;

  for (const [t, s] of times) {
    answer = Math.min(answer, s) - t; // 최대한 늦게 시작할 수 있는 시간 갱신
    // 가능한 시간내에 작업 불가
    if (answer < 0) {
      console.log(-1);
      return;
    }
  }

  console.log(answer);
}

solution();

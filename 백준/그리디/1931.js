const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1931.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
// 1. 먼저 끝나는 순, 2. 끝나는 시간 같으면 먼저 시작하는 순으로 정렬
const arr = input
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

function solution() {
  let answer = 0;
  let previousEnd = 0;
  for (let [start, end] of arr) {
    // 시작 시각이 이전 회의의 끝나는 시각과 같거나 이후일 경우 값 갱신
    if (start >= previousEnd) {
      previousEnd = end;
      answer++;
    }
  }
  return answer;
}

console.log(solution());

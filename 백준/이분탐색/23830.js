const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/23830.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const L = input[1].split(" ").map(Number);
const [P, Q, R, S] = input[2].split(" ").map(Number);

let start = 1;
let end = 20000000000;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let total = 0;

  // 각 학생의 실력에 따른 총합 계산
  for (let i = 0; i < N; i++) {
    if (L[i] > mid + R) total += L[i] - P;
    else if (L[i] < mid) total += L[i] + Q;
    else total += L[i];
  }

  if (total >= S) end = mid - 1;
  else start = mid + 1;
}

if (start >= 20000000000) console.log(-1);
else console.log(start);

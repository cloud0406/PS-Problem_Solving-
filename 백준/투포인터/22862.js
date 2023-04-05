const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22862.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

let answer = 0;
let start = 0; // 투포인터 시작 인덱스
let cnt = 0; // 홀수 자른 횟수

for (let end = 0; end < N; end++) {
  if (nums[end] % 2 === 1) cnt++;

  // 홀수 자른 횟수가 K번 보다 많은 경우 -> 왼쪽 인덱스를 오른쪽으로 이동
  while (cnt > K) {
    if (nums[start] % 2 === 1) cnt--; // 홀수일 경우 자른 횟수를 하나 원상복구
    start++;
  }

  // 수열 전체 길이 (오른쪽 인덱스 - 왼쪽 인덱스 + 1) - 홀수 자른 횟수(Cnt)
  if (K >= cnt) answer = Math.max(answer, end - start + 1 - cnt);
}

console.log(answer);

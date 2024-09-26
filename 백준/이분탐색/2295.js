let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2295.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
let nums = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;

// 두 수의 합 조합을 저장
let sums = [];
for (let i = 0; i < N; i++) {
  for (let j = i; j < N; j++) {
    sums.push(nums[i] + nums[j]);
  }
}
let sumsS = new Set(sums.sort((a, b) => a - b));

let numsS = new Set(nums);
// 뒤쪽의 큰 수부터 탐색하면 조건 맞으면 종료
for (let i = N - 1; i >= 0; i--) {
  for (let sum of sumsS) {
    // 주어진 숫자 중, (현재 수 - 두 수의 합 조합)이 가능한지 확인
    if (numsS.has(nums[i] - sum)) {
      answer = nums[i];
      console.log(answer);
      return;
    }
  }
}

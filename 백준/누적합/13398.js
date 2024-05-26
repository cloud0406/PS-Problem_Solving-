const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13398.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const nums = input[1].split(" ").map(Number);

function solution(n, nums) {
  // 해당 인덱스의 수를 제거하는 경우와 제거하지 않는 경우의 최대값을 저장하기 위한 sum
  let sum = Array.from({ length: n }, () => Array(2).fill(0));
  sum[0][0] = sum[0][1] = nums[0];

  let answer = nums[0];

  for (let i = 1; i < nums.length; i++) {
    sum[i][0] = Math.max(nums[i], nums[i] + sum[i - 1][0]); // 제거 x
    // 제거 o, 제거는 1번만 가능하므로 이전 값에서 제거하지 않고 현재 값을 제거한 경우와 비교
    sum[i][1] = Math.max(sum[i - 1][0], sum[i - 1][1] + nums[i]);
    answer = Math.max(answer, sum[i][0], sum[i][1]);
  }

  return answer;
}

console.log(solution(n, nums));

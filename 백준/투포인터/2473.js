const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2473.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const nums = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution(N, nums) {
  let ansArr = [];
  let ans = Infinity;

  // 용액 3개 선택 -> 반복문 탐색하며 i로 하나 지정, 나머지 2개 이분탐색으로 지정
  for (let i = 0; i < N - 2; i++) {
    let left = i + 1;
    let right = N - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      // 0에 더 가까우면 갱신
      if (Math.abs(sum) < ans) {
        ans = Math.abs(sum);
        ansArr = [nums[i], nums[left], nums[right]];
      }

      if (sum < 0) left++;
      else right--;
    }
  }

  return ansArr.join(" ");
}
console.log(solution(N, nums));

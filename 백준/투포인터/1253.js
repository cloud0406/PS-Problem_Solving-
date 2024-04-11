const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1253.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const nums = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < N; i++) {
  // 자기 자신은 제외한 두 수 이어야하므로 배열 자름, target은 자기 자신
  findNum(nums.slice(0, i).concat(nums.slice(i + 1)), nums[i]);
}

function findNum(nums, target) {
  let left = 0;
  let right = N - 1;

  while (left < right) {
    let sum = nums[left] + nums[right];

    if (sum === target) {
      answer++;
      break;
    }

    if (sum < target) left++;
    else right--;
  }
}

console.log(answer);

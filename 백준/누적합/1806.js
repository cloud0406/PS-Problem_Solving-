const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1806.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution(N, M, arr) {
  let answer = Infinity;

  let left = 0,
    right = 0,
    sum = 0;

  while (left <= right) {
    if (sum >= M) {
      answer = Math.min(answer, right - left);
      sum -= arr[left++];
    } else if (right === N) break;
    else sum += arr[right++];
  }

  return answer === Infinity ? 0 : answer;
}

console.log(solution(N, M, arr));

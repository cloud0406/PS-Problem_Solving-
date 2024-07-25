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

  while (right < N) {
    sum += arr[right];

    // sum이 M미만이 될 때까지 Left 당김
    while (sum >= M) {
      sum -= arr[left];
      answer = Math.min(answer, right - left + 1);
      left++;
    }

    right++;
  }

  return answer === Infinity ? 0 : answer;
}

console.log(solution(N, M, arr));

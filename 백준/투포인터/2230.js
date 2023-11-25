const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2230.txt"
  )
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input
  .slice(1)
  .map((v) => +v)
  .sort((a, b) => a - b);

function solution(N, M, arr) {
  let answer = Infinity;
  let left = 0;
  let right = 0;

  while (left <= right && right < N) {
    const curDiff = Math.abs(arr[left] - arr[right]);

    if (curDiff < M) right++;
    else {
      answer = Math.min(answer, curDiff);
      left++;
    }

    if (curDiff === M) break;
  }

  return answer;
}

console.log(solution(N, M, arr));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17951.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const scores = input[1].split(" ").map(Number);

function getMaxMinGroupScore(N, K, scores) {
  let left = Math.min(...scores);
  let right = scores.reduce((sum, score) => sum + score, 0);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let groupCount = 1;
    let currentSum = 0;
    let minGroupScore = Infinity;

    // 그룹 나누기
    for (let i = 0; i < N; i++) {
      currentSum += scores[i];

      if (currentSum >= mid) {
        groupCount++;
        minGroupScore = Math.min(minGroupScore, currentSum);
        currentSum = 0;
      }
    }

    // 마지막 그룹 처리
    if (currentSum > 0) {
      minGroupScore = Math.min(minGroupScore, currentSum);
    }

    if (groupCount > K) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left - 1;
}

console.log(getMaxMinGroupScore(N, K, scores));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/25391.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

const scores = input
  .slice(1)
  .map((line) => line.split(" ").map(Number))
  .sort((a, b) => b[1] - a[1]);

let selectedByJudge = scores.slice(0, K);

// 남은 작품 중 주최자 점수 기준으로 정렬하여 M개 선택
let remainingScores = scores.slice(K).sort((a, b) => b[0] - a[0]);

let selectedByHost = remainingScores.slice(0, M);

// 선택된 작품들의 주최자 점수 합계 계산
let totalScore = 0;
for (const [a, b] of selectedByJudge) {
  totalScore += a;
}
for (const [a, b] of selectedByHost) {
  totalScore += a;
}

console.log(totalScore);

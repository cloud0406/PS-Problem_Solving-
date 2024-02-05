const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21941.txt"
  )
  .toString()
  .trim()
  .split("\n");

const S = input[0];
const M = +input[1];

const table = [];
const scores = Array(S.length).fill(-Infinity);

for (let i = 2; i < M + 2; i++) {
  const [key, score] = input[i].split(" ");
  table.push([key, +score]);
}

// 문자열 맨 뒤에서부터 최대 점수 갱신
function solution(start) {
  if (start >= S.length) return 0;

  if (scores[start] !== -Infinity) return scores[start];

  scores[start] = solution(start + 1) + 1;

  for (const [str, score] of table) {
    if (S.substring(start, start + str.length) === str) {
      scores[start] = Math.max(
        scores[start],
        solution(start + str.length) + score
      );
    }
  }

  return scores[start];
}

console.log(solution(0));

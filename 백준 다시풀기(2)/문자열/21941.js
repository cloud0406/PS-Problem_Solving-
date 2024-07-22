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
const scores = Array(S.length).fill(-Infinity); // 각 인덱스에서 시작하는 문자열 부분에 대해 얻을 수 있는 최대 점수를 저장

for (let i = 2; i < M + 2; i++) {
  const [key, score] = input[i].split(" ");
  table.push([key, +score]);
}

// 문자열 맨 뒤에서부터 최대 점수 갱신
function solution(cur) {
  if (cur >= S.length) return 0; // 문자열 끝까지 탐색

  if (scores[cur] !== -Infinity) return scores[cur]; // 이미 계산된 경우

  scores[cur] = solution(cur + 1) + 1; // 현재 문자를 선택하지 않은 경우의 초기 점수 설정 (한 글자 지우기, 점수 +1)

  // 가능한 문자열 패턴을 탐색
  for (const [str, score] of table) {
    if (S.substring(cur, cur + str.length) === str) {
      scores[cur] = Math.max(scores[cur], solution(cur + str.length) + score);
    }
  }

  return scores[cur];
}

console.log(solution(0));

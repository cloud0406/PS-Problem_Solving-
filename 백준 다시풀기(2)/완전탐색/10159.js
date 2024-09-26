const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10159.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const M = +input[1];
const weights = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(N, M, weights) {
  let answer = [];

  const check = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));

  // 입력으로 주어진 비교 결과 체크
  for (const [big, small] of weights) {
    check[big][small] = true;
  }

  // ex) 1>2, 2>3 이면 1>3 알 수 있음
  for (let k = 1; k <= N; k++) {
    for (let big = 1; big <= N; big++) {
      for (let small = 1; small <= N; small++) {
        if (check[big][k] && check[k][small]) check[big][small] = true;
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    let cnt = 0;

    for (let j = 1; j <= N; j++) {
      // 같은 물건일 경우 건너뜀 (자기 자신과 다른 물건만 비교)
      if (i === j) continue;
      // ex) 1,2 : 1>2, 1<2도 아니라면 1,2의 비교결과 알 수 없음
      if (!check[i][j] && !check[j][i]) cnt++;
    }

    answer.push(cnt);
  }

  return answer;
}

console.log(solution(N, M, weights).join("\n"));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10159.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const M = +input[1];
const arr = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  let answer = [];

  const check = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));

  // 문제에서 주어진 비교 결과 체크
  for (let [a, b] of arr) {
    check[a][b] = true;
  }

  // 플로이드 와샬로 위의 결과들을 통해 알 수 있는 새로운 결과 체크 , ex) 1>2, 2>3 이면 1>3 알 수 있음
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (check[i][k] && check[k][j]) check[i][j] = true;
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    let count = -1;

    for (let j = 1; j <= N; j++) {
      if (!check[i][j] && !check[j][i]) count++; // ex) 1,2일 경우 1>2 1<2로 알 수 있는지 체크
    }
    answer.push(count);
  }

  return answer;
}

console.log(solution(N, M, arr).join("\n"));

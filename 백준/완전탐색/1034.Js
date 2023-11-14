const input = (f = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1034.txt"
  )
  .toString()
  .trim()
  .split("\n"));

const [n, m] = input[0].split(" ").map(Number);
const arr = input.slice(1, n + 1);
const k = Number(input[n + 1].trim());

function solution(n, m, arr, k) {
  let answer = 0;

  // 모든 행에 대해 반복
  for (let col = 0; col < n; col++) {
    let cntZero = 0; // 0개수 확인
    for (let num of arr[col]) {
      if (num === "0") cntZero++;
    }

    let cntEqual = 0; // 이 행과 똑같은 값을 가진 행의 개수 세기
    if (cntZero <= k && cntZero % 2 === k % 2) {
      // 한 행의 스위치를 모두 켤 수 있으면, 값이 완전히 같은 행을 찾기
      for (let col2 = 0; col2 < n; col2++) {
        if (arr[col] === arr[col2]) cntEqual++;
      }
    }

    answer = Math.max(answer, cntEqual);
  }

  return answer;
}

console.log(solution(n, m, arr, k));

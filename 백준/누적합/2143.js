const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "./dev/stdin" : __dirname + "/input/2143.txt"
  )
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.trim());

const T = +input[0];
const Acnt = +input[1];
const A = input[2].split(" ").map(Number);
const Bcnt = +input[3];
const B = input[4].split(" ").map(Number);

function solution(T, Acnt, A, Bcnt, B) {
  let answer = 0;
  let mapA = new Map(); // A로 만들 수 있는 부배열의 합을 저장

  for (let i = 0; i < Acnt; i++) {
    let sum = 0;

    for (let j = i; j < Acnt; j++) {
      sum += A[j];
      // 만들 수 있는 부배열 합의 가짓수와 개수 저장
      mapA.set(sum, mapA.has(sum) ? mapA.get(sum) + 1 : 1);
    }
  }

  for (let i = 0; i < Bcnt; i++) {
    let sum = 0;

    for (let j = i; j < Bcnt; j++) {
      sum += B[j];
      // B 배열로도 부배열의 합을 만들면서 만들고자하는 T에서 뺀 값이 mapA에 있다면
      // 해당 개수 만큼 A부배열 합 + B부배열 합 만들기 가능
      if (mapA.has(T - sum)) answer += mapA.get(T - sum);
    }
  }

  return answer;
}

console.log(solution(T, Acnt, A, Bcnt, B));

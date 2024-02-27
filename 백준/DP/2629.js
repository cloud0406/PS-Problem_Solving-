const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2629.txt"
  )
  .toString()
  .trim()
  .split("\n");

let n = +input[0];
let weights = input[1].split(" ").map(Number);
let m = input[2];
let balls = input[3].split(" ").map(Number);

function solution(n, weights, m, balls) {
  let dp = [0]; // 현재 추 무게 자체도 더할 수 있게 0으로 초기화 -> 0+현재 무게 = 현재 무게
  let answer = [];

  // dp에 저장된 확인 가능한 무게에 대해 현재 추 무게를 더하거나 뺀 값을 추가
  for (let weight of weights) {
    let tmp = [];
    for (let i of dp) {
      tmp.push(i + weight);
      tmp.push(Math.abs(i - weight));
    }

    dp = Array.from(new Set([...dp, ...tmp])); // 연산 줄이기 위해 중복 제거
  }

  for (let ball of balls) {
    if (dp.includes(ball)) answer.push("Y");
    else answer.push("N");
  }

  return answer;
}

console.log(solution(n, weights, m, balls).join(" "));

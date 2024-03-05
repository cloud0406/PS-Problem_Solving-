const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21925.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const A = input[1].split(" ").map(Number);

function solution(N, A) {
  let answer = 0;
  let left = 0;
  let right = 1;
  let flag = false; // 모든 부분 수열이 팰린드롬 조건 만족하는지 체크

  // 부분 수열 양쪽 끝에서부터 중앙으로 이동하며 같은지 체크
  const check = (left, right) => {
    for (let i = 0; i <= Math.floor((right - left) / 2); i++) {
      if (A[left + i] !== A[right - i]) return false;
    }

    return true;
  };

  // 최대 개수 구하기 위해 최소한의 길이로 팰린드롬 만들어보면서 조건 충족하면 바로 잘라내기
  for (let i = 0; i < N; i += 2) {
    // 팰린드롬이면 답 증가
    if (check(left, right)) {
      answer++;
      left = right + 1;
      right = left + 1;

      flag = true;
    } else {
      // 아니면 길이 2씩 늘리면서 다시 체크
      right += 2;

      flag = false;
    }
  }

  return flag ? answer : -1;
}

console.log(solution(N, A));

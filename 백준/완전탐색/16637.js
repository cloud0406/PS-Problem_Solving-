const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16637.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split("");

function solution(N, arr) {
  let answer = -Infinity;

  const cal = (num1, num2, op) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      default:
        return 0;
    }
  };

  const choice = (idx, val) => {
    let flag = false;

    // 종료 조건
    if (idx >= N - 1) {
      if (val > answer) answer = val;
      return;
    }

    // 해당 인덱스부터는 뒤에 괄호로 묶어서 처리할 숫자가 없으므로 괄호를 쓰지 못하도록 플래그 처리
    if (idx >= N - 3) flag = true;

    // 기본 연산 실행 -> 3+8
    let result1 = cal(Number(val), Number(arr[idx + 2]), arr[idx + 1]);
    choice(idx + 2, result1);

    // 다음 연산 값을 괄호를 사용해서 연산 실행 -> 3+(8*7)
    if (!flag) {
      // 뒤의 값을 괄호로 묶어서 먼저 연산 진행
      let temp = cal(Number(arr[idx + 2]), Number(arr[idx + 4]), arr[idx + 3]);
      let result2 = cal(Number(val), temp, arr[idx + 1]); // 현재 값, 괄호로 먼저 처리한 값 연산
      choice(idx + 4, result2);
    }
  };

  choice(0, arr[0]);

  return answer;
}

console.log(solution(N, arr));

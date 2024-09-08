// 입력 처리를 위한 부분 (Node.js 환경)
const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14786.txt"
  )
  .toString()
  .trim()
  .split(" ");

const a = parseFloat(input[0]);
const b = parseFloat(input[1]);
const c = parseFloat(input[2]);

let now = 0;
let next;

// 오차 범위 설정
const epsilon = 0.000000001;

// 뉴턴-랩슨 방법을 이용한 반복
while (Math.abs(a * now + b * Math.sin(now) - c) > epsilon) {
  next = now - (a * now + b * Math.sin(now) - c) / (a + b * Math.cos(now));
  now = next;
}

// 결과 출력
console.log(now.toFixed(9));

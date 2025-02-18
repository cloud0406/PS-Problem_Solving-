const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1790.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, initK] = input[0].split(" ").map(Number);
let answer = 0;
let digit = 1;
let nine = 9;
let K = initK;

// K번째 숫자가 속한 수를 찾기
while (K > digit * nine) {
  K -= digit * nine;
  answer += nine;
  digit += 1;
  nine *= 10;
}

// K번째 숫자가 속한 실제 수 계산
answer = answer + 1 + Math.floor((K - 1) / digit);

if (answer > N) console.log(-1);
else console.log(answer.toString()[(K - 1) % digit]);

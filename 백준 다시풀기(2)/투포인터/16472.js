const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16472.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const string = input[1];
const alphabets = new Map();
let answer = 0;
let left = 0;

for (let right = 0; right < string.length; right++) {
  // 변수만들어서 쓰면 시간초과
  //   const string[left] = string[left];
  //   const string[right] = string[right];

  alphabets.set(string[right], (alphabets.get(string[right]) || 0) + 1); // left ~ right 알파벳 개수 체크

  // 알파벳 종류 n개보다 많을 경우
  // left 증가 및 left 알파벳 개수 줄이기, 0개되면 제거
  while (alphabets.size > n) {
    alphabets.set(string[left], alphabets.get(string[left]) - 1);
    if (alphabets.get(string[left]) === 0) alphabets.delete(string[left]);
    left++;
  }

  answer = Math.max(answer, right - left + 1);
}

console.log(answer);

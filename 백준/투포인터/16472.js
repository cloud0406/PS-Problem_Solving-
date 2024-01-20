const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16472.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const string = input[1];
const check = new Map();
let answer = 0;
let left = 0;

for (let right = 0; right < string.length; right++) {
  check.set(string[right], (check.get(string[right]) || 0) + 1); // map에 해당 알파벳 개수 증가

  // map에 저장된 알파벳이 n개보다 많을 경우
  while (check.size > n) {
    check.set(string[left], check.get(string[left]) - 1); // 왼쪽 알파벳부터 개수 줄여나감

    if (check.get(string[left]) === 0) check.delete(string[left]); // 개수 줄이다 0개되면 해당 알파벳 map에서 제거

    left++;
  }

  answer = Math.max(answer, right - left + 1); // 길이 체크
}

console.log(answer);

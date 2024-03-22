const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6173.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const chars = input.slice(1);

function solution(N, chars) {
  let answer = "";

  let T = [];

  let head = 0;
  let tail = chars.length - 1;

  while (head <= tail) {
    while (chars[head] === chars[tail]) {
      head++;
      tail--;
      if (head >= tail) break;
    }

    if (chars[head] < chars[tail]) T.push(chars.shift());
    else T.push(chars.pop());

    head = 0;
    tail = chars.length - 1;

    if (head === tail) {
      T.push(chars[head]);
      break;
    }
  }

  for (let i = 0; i < T.length; i++) {
    if (i % 80 === 0) answer += "\n";

    answer += T[i];
  }

  return answer.trim();
}

console.log(solution(N, chars));

let [N, K] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1052.txt"
  )
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution(N, K) {
  let cnt = 0;

  function totalOne(n) {
    let count = 0;
    while (n > 0) {
      if (n % 2 === 1) {
        count++;
      }
      n = Math.floor(n / 2);
    }
    return count;
  }

  while (totalOne(N) > K) {
    N = N + 1;
    cnt++;
  }

  return cnt;
}

const answer = solution(N, K);

console.log(answer);

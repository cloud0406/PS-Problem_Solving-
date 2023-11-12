const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6068.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const works = input
  .slice(1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[1] - b[1]);

function solution(N, works) {
  let answer = Infinity;
  let t = 0;

  for (let i = 0; i < N; i++) {
    let [time, end] = works[i];
    t += time;

    if (t > end) {
      console.log(-1);
      return;
    }
    if (answer > end - t) answer = end - t;
  }

  console.log(answer);
}

solution(N, works);

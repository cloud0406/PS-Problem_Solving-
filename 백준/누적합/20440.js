const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20440.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function soloution(N, arr) {
  let answer = 0;
  const times = [];

  for (let [start, end] of arr) {
    times.push([1, start]);
    times.push([-1, end]);
  }

  times.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    else return a[1] - b[1];
  });

  let cnt = 0;
  let start = 0;
  let end = 0;
  let flag = false;
  for (let [a, time] of times) {
    if (cnt === answer && !flag) {
      end = time;
      flag = true;
    }

    if (a === 1) cnt++;
    else cnt--;

    if (cnt > answer) {
      answer = cnt;
      start = time;
      flag = false;
    }
  }

  console.log(answer);
  console.log(start, end);
}

soloution(N, arr);

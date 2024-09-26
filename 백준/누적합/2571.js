const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2571.txt"
  )
  .toString()
  .trim()
  .split("\n");

let N = +input[0];
let array = Array.from({ length: 100 }, () => Array(100).fill(0));

for (let i = 1; i <= N; i++) {
  const [x, y] = input[i].split(" ").map(Number);

  for (let a = x; a < x + 10; a++) {
    for (let b = y; b < y + 10; b++) {
      array[a][b] = 1;
    }
  }
}

let answer = -1;

function acc() {
  for (let i = 0; i < 99; i++) {
    for (let j = 0; j < 100; j++) {
      if (array[i][j] !== 0 && array[i + 1][j] !== 0) {
        array[i + 1][j] = array[i][j] + 1;
      }
    }
  }
}

function sum() {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let h = 100;
      for (let k = j; k < 100; k++) {
        h = Math.min(array[i][k], h);
        if (h === 0) break;
        answer = Math.max(answer, h * (k - j + 1));
      }
    }
  }
}

acc();
sum();
console.log(answer);

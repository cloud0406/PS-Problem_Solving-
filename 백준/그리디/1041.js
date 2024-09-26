const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1041.txt"
  )
  .toString()
  .trim()
  .split("\n");

let N = +input[0];
let arr = input[1].split(" ").map(Number);

let answer = 0;
let mins = [];

if (N === 1) {
  arr.sort((a, b) => a - b);
  for (let i = 0; i < 5; i++) {
    answer += arr[i];
  }
} else {
  mins.push(Math.min(arr[0], arr[5]));
  mins.push(Math.min(arr[1], arr[4]));
  mins.push(Math.min(arr[2], arr[3]));
  mins.sort((a, b) => a - b);

  // 1, 2, 3 면 주사위 최소값
  const min1 = mins[0];
  const min2 = mins[0] + mins[1];
  const min3 = mins.reduce((acc, cur) => acc + cur, 0);

  // 1, 2, 3 면 주사위 개수
  const n1 = 4 * (N - 2) * (N - 1) + (N - 2) ** 2;
  const n2 = 4 * (N - 1) + 4 * (N - 2);
  const n3 = 4;

  answer += min1 * n1 + min2 * n2 + min3 * n3;
}

console.log(answer);

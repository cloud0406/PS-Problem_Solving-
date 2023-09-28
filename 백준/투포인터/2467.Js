const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2467.txt"
  )
  .toString()
  .trim()
  .split("\n");

const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution(arr) {
  let left = 0;
  let right = arr.length - 1;
  let answer = [];
  let min = Infinity;

  while (left < right) {
    let sum = arr[left] + arr[right];

    if (min > Math.abs(sum)) {
      min = Math.abs(sum);
      answer = [arr[left], arr[right]];
    }

    sum < 0 ? left++ : right--;
  }

  console.log(answer.join(" "));
}

solution(arr);

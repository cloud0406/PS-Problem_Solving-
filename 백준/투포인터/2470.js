const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2470.txt"
  )
  .toString()
  .trim()
  .split("\n");

const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b); // 오름차순으로 정렬해둠

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

    // 합의 차이가 줄도록 양수(right)와 음수(left)를 다음 인덱스로 이동시킴
    sum < 0 ? left++ : right--;
  }

  console.log(answer.join(" "));
}

solution(arr);

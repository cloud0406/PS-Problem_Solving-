const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22945.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);

function solution(N, arr) {
  let answer = 0;
  let left = 0;
  let right = N - 1;

  while (left < right) {
    answer = Math.max(
      answer,
      (right - left - 1) * Math.min(arr[left], arr[right])
    );

    // 능력치의 최대값을 구하기 위해서, 왼쪽과 오른쪽 중 더 작은 쪽의 인덱스를 변경
    if (arr[left] < arr[right]) left++;
    else right--;
  }

  return answer;
}

console.log(solution(N, arr));

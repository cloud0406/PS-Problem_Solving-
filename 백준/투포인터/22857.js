const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/22857.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
const nums = [0, ...arr];

function solution() {
  let answer = 0;
  let start = 0; // 투포인터 시작 인덱스
  let cnt = 0; // 홀수 자른 횟수
  let sum = 0; // 연속된 짝수 개수

  for (let end = 1; end <= N; end++) {
    // K번 자르기 모두 사용했는데 홀수 만났을때
    if (cnt === K && nums[end] % 2 !== 0) {
      if (sum > answer) answer = sum;
      start++;
      while (nums[start] % 2 === 0) {
        sum--;
        start++;
      }
      cnt--;
    }

    // 짝수 or 홀수 만날때
    if (nums[end] % 2 === 0) {
      sum++;
      if (sum > answer) answer = sum;
    } else cnt++;
  }

  console.log(answer);
}

solution();

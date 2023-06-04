const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13164.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution(N, K, arr) {
  const diff = []; // 다음 인덱스와의 간격 차이를 담아두는 배열
  for (let i = 0; i < arr.length - 1; i++) {
    diff[i] = arr[i + 1] - arr[i];
  }

  // K개로 조 나눌때 어떻게 묶든 인덱스간 간격은 N-K개 만큼 존재
  // 따라서 위에서 구한 인덱스간 간격 배열을 정렬해서 낮은 것부터 N-K개 더해주면 됨
  return diff
    .sort((a, b) => a - b)
    .slice(0, N - K)
    .reduce((acc, cur) => acc + cur, 0);
}

console.log(solution(N, K, arr));

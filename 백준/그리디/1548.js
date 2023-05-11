const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1548.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const arr = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution(N, arr) {
  if (N <= 2) return N;
  let answer = 2; // 원소 개수 3개이상일때 나올 수 있는 최소 값 -> 2

  for (let first = 0; first < N - 2; first++) {
    let second = first + 1;
    for (let third = N - 1; third >= 2; third--) {
      // 작은거 2개 더한 값이 가장 큰 값보다 크면 나머진 모두 만족
      if (arr[first] + arr[second] > arr[third]) {
        answer = Math.max(answer, third - first + 1);
        break;
      }
    }
  }

  return answer;
}

console.log(solution(N, arr));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1548.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

if (N <= 2) {
  console.log(N);
  return;
}
let answer = 2; // 3개이상일때 나올 수 있는 최소 값 -> 2

for (let first = 0; first < N - 2; first++) {
  let second = first + 1;
  for (let third = N - 1; third > second; third--) {
    // 가장 큰 값보다 해당 순열에서 가장 작은 두 값의 합이 크면 사이의 나머진 모두 만족
    if (arr[third] < arr[first] + arr[second]) {
      answer = Math.max(answer, third - first + 1);
      break;
    }
  }
}

console.log(answer);

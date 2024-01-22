const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20159.txt"
  )
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const arr = input[1].split(" ").map(Number);

let sum = 0; // 밑장 빼기 안 할 경우
for (let i = 0; i < N; i++) {
  if (i % 2 === 0) sum += arr[i];
}

let ans = sum;
let change_sum = sum;

// 본인 차례에서 밑장빼기 시도했을 경우
// 밑장빼기 시점부터 쭉 카드 순서가 바뀌므로 뒤에서부터 반복문 돌며 최대값 시점을 갱신
for (let i = N - 1; i > 0; i -= 2) {
  change_sum += arr[i]; // 원래 상대 카드일 짝수번째 카드를 가짐 (밑장 빼기로 순서가 바뀌므로)
  change_sum -= arr[i - 1];
  ans = Math.max(ans, change_sum);
}

change_sum = sum;
// 상대 차례에서 밑장빼기 시도
for (let i = N - 2; i > 1; i -= 2) {
  change_sum -= arr[i];
  change_sum += arr[i - 1];
  ans = Math.max(ans, change_sum);
}

console.log(ans);

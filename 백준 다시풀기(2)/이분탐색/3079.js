const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/3079.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(BigInt);
const times = input.slice(1).map(BigInt);

let left = 0n;
let right = 10n ** 9n * M;
let answer = right;
let mid = BigInt((left + right) / 2n);

while (left <= right) {
  mid = mid = BigInt((left + right) / 2n);
  // mid 시간 동안 심사할 때, 각각 심사대에서 할 수 있는 최대 인원을 파악 후 전체 인원을 구함
  let max_people = times.reduce((acc, cur) => acc + BigInt(mid / cur), 0n);

  if (max_people >= M) {
    right = mid - 1n;
    answer = answer > mid ? mid : answer;
  } else left = mid + 1n;
}

console.log(answer.toString());

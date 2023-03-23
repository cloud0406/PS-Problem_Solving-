const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/3079.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const times = input.slice(1).map(Number);

if (N === 1) {
  return console.log(times[0] * M);
}

let left = 0;
let right = Math.max(...times) * M; // 모두 심사했을 때 가능한 최대 시간
let ans = Math.max(...times) * M;

while (left <= right) {
  let mid = Math.floor((left + right) / 2); // 시간을 지정
  // mid 시간 동안 심사할 때, 각각 심사대에서 할 수 있는 최대 인원을 파악 후 전체 인원을 구함
  let max_people = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);

  // 심사가능한 최대인원이 총 인원보다 많을 경우
  if (max_people >= M) {
    right = mid - 1; // 심사 시간을 줄이고
    ans = Math.min(ans, mid); // 최소 심사시간 저장
  }
  // 총 인원보다 적을 경우는
  else {
    left = mid + 1; // 모든 인원을 심사하기 위해 심사시간을 늘림
  }
}

console.log(ans);

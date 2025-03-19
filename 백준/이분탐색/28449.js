const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/28449.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const hi = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const arc = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const answer = [0, 0, 0]; // [hi가 이기는 경우, arc가 이기는 경우, 무승부]

// 각 hi 팀원에 대해
for (let i = 0; i < N; i++) {
  const skill = hi[i];

  let left = 0;
  let right = M;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arc[mid] >= skill) right = mid;
    else left = mid + 1;
  }
  const idx = left;

  // skill보다 큰 값이 처음 나오는 위치
  left = 0;
  right = M;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arc[mid] > skill) right = mid;
    else left = mid + 1;
  }
  const idx2 = left;

  answer[2] += idx2 - idx; // 무승부
  answer[1] += M - idx2; // arc가 이기는 경우
  answer[0] += idx; // hi가 이기는 경우
}

console.log(answer.join(" "));

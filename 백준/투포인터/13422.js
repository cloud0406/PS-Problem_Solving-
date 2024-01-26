const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/13422.txt"
  )
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
let idx = 1;
let answers = [];

for (let i = 1; i <= T; i++) {
  const [N, M, K] = input[idx++].split(" ").map(Number);
  const village = input[idx++].split(" ").map(Number);

  // 원형 모양 처리하기 위해 앞에 요소 더 붙임, 문제에서 M범위 M(1 ≤ M ≤ N)인데 m=n일 경우는 확인할 경우가 한 가지 밖에 없으므로 배열 증가 x
  if (M !== N) {
    for (let j = 0; j < M - 1; j++) {
      village.push(village[j]);
    }
  }

  let left = 0;
  let right = M - 1;
  let count = village.slice(0, M).reduce((acc, cur) => acc + cur, 0);
  let answer = 0;

  if (count < K) answer++;

  while (right < village.length - 1) {
    count = count - village[left++] + village[++right];

    if (count < K) answer++;
  }

  answers.push(answer);
}

console.log(answers.join("\n"));

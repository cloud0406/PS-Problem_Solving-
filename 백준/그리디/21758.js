const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/21758.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const honeys = input[1].split(" ").map(Number);

function solution(N, honeys) {
  let answer = 0;
  let sum = new Array(N); // 계산하기 쉽도록 해당 인덱스까지의 꿀 누적합을 담을 배열

  // 누적합 담기
  for (let i = 0; i < N; i++) {
    if (i === 0) sum[0] = honeys[0];
    else sum[i] = sum[i - 1] + honeys[i];
  }

  // 1. 벌 - 벌 - 꿀통 : 벌 하나 가장 왼쪽, 꿀통 가장 오른쪽, 나머지 벌은 사이에 두기
  for (let i = 1; i < N - 1; i++) {
    answer = Math.max(
      answer,
      sum[N - 1] - honeys[0] - honeys[i] + (sum[N - 1] - sum[i])
    );
  }

  // 2. 꿀통 - 벌 - 벌 : 꿀통 가장 왼쪽, 벌 하나 가장 오른쪽, 나머지 벌은 사이에 두기
  for (let i = 1; i < N - 1; i++) {
    answer = Math.max(
      answer,
      sum[i - 1] + (sum[N - 1] - honeys[N - 1] - honeys[i])
    );
  }

  // 3. 벌 - 꿀통 - 벌 : 벌 하나 가장 왼쪽, 나머지 벌 가장 오른쪽, 꿀통은 사이에 두기
  for (let i = 1; i < N - 1; i++) {
    answer = Math.max(
      answer,
      sum[i] - honeys[0] + (sum[N - 1] - sum[i - 1] - honeys[N - 1])
    );
  }

  return answer;
}

console.log(solution(N, honeys));

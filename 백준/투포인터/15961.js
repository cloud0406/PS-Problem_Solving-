const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/15961.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, d, k, c] = input[0].split(" ").map(Number);
const data = input.slice(1).map(Number);

function soloution(N, d, k, c, data) {
  let answer = 0;
  const belt = [...data, ...data.slice(0, k - 1)]; // 회전하므로 끝에서 마지막 인덱스와 처음 인덱스가 겹치는 부분이 나온다
  const sushi = Array(d + 1).fill(0); // k개로 묶었을때 초밥별 개수 저장
  sushi[c] = 1; // 쿠폰으로 받은 초밥은 항상 포함하므로 한 개로 시작
  let cnt = 1; // 현재 초밥 종류

  // 처음 k개 묶기
  for (let i = 0; i < k; i++) {
    if (!sushi[belt[i]]++) cnt++; // 해당 초밥 0개면 초밥의 종류를 하나 늘림, 해당 초밥 개수 하나 증가
  }

  for (let left = 1, right = k; left < N; left++, right++) {
    if (!--sushi[belt[left - 1]]) cnt--; // 이전 초밥 개수 하나 줄이고, 해당 초밥이 0개가 되면 종류를 하나 줄임
    if (!sushi[belt[right]]++) cnt++; // 다음 초밥 개수가 0개면 종류 하나 증가, 해당 초밥 개수 하나 증가

    answer = Math.max(answer, cnt);
    if (answer === k + 1) return answer; // 최대 개수는 k+1(쿠폰)개
  }

  return answer;
}

console.log(soloution(N, d, k, c, data));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/10713.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const P = input[1].split(" ").map(Number);
const costs = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(n, m, P, costs) {
  const arr = Array(n + 1).fill(0);
  let answer = 0;
  let sum = 0;

  // 누적합을 통한 카운팅
  // 출발지점은 +1, 도착지점은 -1
  for (let i = 0; i < m - 1; i++) {
    if (P[i] < P[i + 1]) {
      arr[P[i]]++;
      arr[P[i + 1]]--;
    } else {
      arr[P[i + 1]]++;
      arr[P[i]]--;
    }
  }

  // 누적합을 하면 해당 각 철도를 지나간 빈도를 알 수 있음
  for (let i = 0; i < n - 1; i++) {
    sum += arr[i + 1];
    // 지나간 빈도 수에 맞게 최소 비용 계산 - 티켓 구매 Vs IC 카드 구매
    answer += Math.min(costs[i][0] * sum, costs[i][1] * sum + costs[i][2]);
  }

  return answer;
}

console.log(solution(n, m, P, costs));

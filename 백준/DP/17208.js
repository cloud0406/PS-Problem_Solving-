const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17208.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

// 각 주문의 치즈버거와 감자튀김 요구량 저장
const orders = [[0, 0]].concat(
  input.slice(1, N + 1).map((line) => line.split(" ").map(Number))
);

// dp 배열 초기화: dp[i][j][k]는 i번째 주문까지 고려했을 때 j개의 치즈버거와 k개의 감자튀김으로 처리할 수 있는 최대 주문 수
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: M + 1 }, () => Array(K + 1).fill(0))
);

// 각 주문에 대해 dp 테이블을 채움
for (let i = 1; i < orders.length; i++) {
  const [burgerReq, friesReq] = orders[i];
  for (let burgers = 1; burgers <= M; burgers++) {
    for (let fries = 1; fries <= K; fries++) {
      // 현재 주문을 처리할 수 있는 경우
      if (burgerReq <= burgers && friesReq <= fries) {
        // 현재 주문을 처리하는 경우와 처리하지 않는 경우 중 최대값을 선택
        dp[i][burgers][fries] = Math.max(
          1 + dp[i - 1][burgers - burgerReq][fries - friesReq],
          dp[i - 1][burgers][fries]
        );
      } else {
        // 현재 주문을 처리할 수 없는 경우 이전 상태를 그대로 유지
        dp[i][burgers][fries] = dp[i - 1][burgers][fries];
      }
    }
  }
}

// dp 테이블에서 최대 주문 수를 찾음
const maxOrders = dp.map((i) => Math.max(...i.map((arr) => Math.max(...arr))));
console.log(Math.max(...maxOrders));

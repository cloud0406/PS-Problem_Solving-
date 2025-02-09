const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2258.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const meats = [];

for (let i = 1; i <= N; i++) {
  const [weight, price] = input[i].split(" ").map(Number);
  meats.push([price, weight]);
}

// 가격 오름차순, 같은 가격이면 무게 내림차순 정렬
meats.sort((a, b) => {
  if (a[0] === b[0]) return b[1] - a[1];
  return a[0] - b[0];
});

let minCost = Infinity;
let totalWeight = 0;
let samePriceSum = 0;
let isPossible = false;

for (let i = 0; i < N; i++) {
  totalWeight += meats[i][1];

  // 현재 고기 가격 = 이전 고기 가격
  if (i >= 1 && meats[i][0] === meats[i - 1][0]) samePriceSum += meats[i][0];
  else samePriceSum = 0;

  // 필요 무게 충족
  if (totalWeight >= M) {
    minCost = Math.min(minCost, meats[i][0] + samePriceSum);
    isPossible = true;
  }
}

console.log(isPossible ? minCost : -1);

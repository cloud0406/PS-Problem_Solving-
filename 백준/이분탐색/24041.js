const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/24041.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, G, K] = input[0].split(" ").map(Number);
const mealkits = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(N, G, K, mealkits) {
  let maxDays = 0;
  const ingredients = { essential: [], optional: [] };

  // 재료들을 중요도에 따라 분류
  for (let i = 0; i < N; i++) {
    const [s, l, o] = mealkits[i];
    ingredients[o === 0 ? "essential" : "optional"].push([s, l]);
  }

  // 특정 날짜에서 세균 수 계산
  const calculateGerms = (days) => {
    let totalGerms = 0;

    // 필수 재료 세균 수 합산
    for (const [s, l] of ingredients.essential) {
      totalGerms += s * Math.max(1, days - l);
    }

    // 선택 재료를 세균 수 기준으로 내림차순 정렬
    const sortedOptionals = ingredients.optional
      .map(([s, l]) => s * Math.max(1, days - l))
      .sort((a, b) => b - a);

    // 가장 높은 세균 수를 가진 재료 중 K개를 제외하고 나머지 합산
    for (let i = K; i < sortedOptionals.length; i++) {
      totalGerms += sortedOptionals[i];
    }

    return totalGerms;
  };

  // 이진 탐색을 통한 최대 날짜 탐색
  let left = 0,
    right = 2e9;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentGerms = calculateGerms(mid);

    if (currentGerms <= G) {
      maxDays = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return maxDays;
}

console.log(solution(N, G, K, mealkits));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/21315.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const mixedCards = input[1].split(" ").map(Number);

function solution(N, mixedCards) {
  let answer = [];

  // 카드 섞기
  const mix = (range, cnt, cards) => {
    let newCards = [];

    // 뒤 쪽에 있는 카드 (밑에 있는 카드부터 선택)
    for (let i = range - cnt; i < range; i++) {
      newCards.push(cards[i]);
      cards[i] = 0; // 위로 올린 카드들 표시
    }

    for (let i = 0; i < N; i++) {
      if (cards[i] !== 0) newCards.push(cards[i]); // 섞지 않고 남아있는 카드들 푸쉬
      cards[i] = newCards[i]; // 섞은 카드로 갱신
    }
  };

  const solve = (k, cards) => {
    let range = N;
    for (let i = 1; i <= k + 1; i++) {
      let cnt = Math.pow(2, k - i + 1); // 카드 몇 개 더미 위로 올릴지

      mix(range, cnt, cards);
      range = cnt;
    }

    return cards;
  };

  // 배열 같은지 비교
  const equals = (a, b) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  // 모든 k1, k2 조합을 탐색 (입력 제한 : 2^K < N)
  for (let k1 = 1; Math.pow(2, k1) < N; k1++) {
    for (let k2 = 1; Math.pow(2, k2) < N; k2++) {
      let mixCards = Array.from({ length: N }, (_, idx) => idx + 1); // 섞기 전 기본 카드 세팅

      mixCards = solve(k2, solve(k1, mixCards)); // 선택한 k1, k2 조합으로 두 번 섞음

      if (equals(mixCards, mixedCards)) answer.push(k1, k2);
    }
  }

  return answer.join(" ");
}

console.log(solution(N, mixedCards));

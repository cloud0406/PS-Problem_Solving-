const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2116.txt"
  )
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const dice = input.slice(1).map((v) => v.split(" ").map(Number));

// 대응되는 면 체크
const pair = {
  0: 5,
  1: 3,
  2: 4,
  3: 1,
  4: 2,
  5: 0,
};

// 각 인덱스가 밑 면일 때, 옆 면들의 인덱스
const sideIndexes = {
  0: [1, 2, 3, 4],
  1: [0, 2, 4, 5],
  2: [0, 1, 3, 5],
  3: [0, 2, 4, 5],
  4: [0, 1, 3, 5],
  5: [1, 2, 3, 4],
};

let answer = 0;

// 첫 주사위 아랫면 선택 가지수 - 6가지
for (let i = 0; i < 6; i++) {
  // i가 밑 면일 때 대응 되는 윗 면, 그리고 옆면들 중 가장 큰 값 체크
  let topIdx = pair[i];
  let top = dice[0][topIdx];
  let sideIdx = sideIndexes[i];
  let total = Math.max(...sideIdx.map((idx) => dice[0][idx]));

  // 첫 번째 주사위의 밑면에 따라 윗면이 정해지고, 다음 주사위들의 밑면도 계속 정해짐
  for (let j = 1; j < dice.length; j++) {
    // 쌓아올린 주사위의 밑면 = 이전 주사위의 윗면
    const bottomIdx = dice[j].indexOf(top);
    topIdx = pair[bottomIdx];
    top = dice[j][topIdx];
    sideIdx = sideIndexes[bottomIdx];
    total += Math.max(...sideIdx.map((idx) => dice[j][idx]));
  }

  answer = Math.max(answer, total);
}

console.log(answer);

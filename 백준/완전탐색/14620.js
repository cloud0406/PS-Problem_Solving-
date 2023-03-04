const fs = require("fs");
const [size, ...arr] = fs
  .readFileSync(__dirname + "/input/14620.txt")
  .toString()
  .trim()
  .split("\n");

const N = +size;
let cost = Infinity; // 최소 비용과 비교하기 위해 임의로 큰 값 설정

const $map = arr.map((el) => el.split(" ").map(Number));

// 방문여부 체크용 : (N+1) x (N+1) 배열 생성
const visited = Array(N + 1)
  .fill(null)
  .map((_) => Array(N + 1).fill(false));

// 방향
// here up left down right
const DY = [0, -1, 0, 1, 0];
const DX = [0, 0, -1, 0, 1];

// 해당 방향 방문 여부 확인 (현재 위치에서 꽃 펴도 되는지)
const checkDirections = (y, x) => {
  for (let k = 0; k < 5; k++) {
    const dy = DY[k] + y;
    const dx = DX[k] + x;
    if (visited[dy][dx]) return false;
  }
  return true;
};

// 해당 방향 방문 체크
const visitSpot = (y, x, sum) => {
  for (let k = 0; k < 5; k++) {
    const dy = DY[k] + y;
    const dx = DX[k] + x;
    visited[dy][dx] = true;
    sum += $map[dy][dx]; // 최종 비용 더하기
  }
  return sum;
};

// 해당 방향 방문 해제
const unvisitSpot = (y, x) => {
  for (let k = 0; k < 5; k++) {
    const dy = DY[k] + y;
    const dx = DX[k] + x;
    visited[dy][dx] = false;
  }
};

const dfs = (y, count, sum) => {
  // 꽃 3개 피면 종료
  if (count === 3) {
    cost = Math.min(cost, sum);
    return;
  }

  for (let i = y; i < N - 1; i++) {
    for (let j = 1; j < N - 1; j++) {
      if (checkDirections(i, j)) {
        const currentSum = visitSpot(i, j, sum);
        dfs(i, count + 1, currentSum);
        unvisitSpot(i, j);
      }
    }
  }
};

dfs(1, 0, 0);

console.log(cost);

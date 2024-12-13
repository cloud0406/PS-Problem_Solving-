const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input/7534.txt")
  .toString()
  .trim()
  .split("\n");

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

let [n, l, m] = input[0].split(" ").map(Number);
let fish = [];
let answer = 0;

// 물고기 위치 입력 받기
for (let i = 1; i <= m; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  fish.push([x - 1, y - 1]);
}

function solution() {
  for (const [sx, sy] of fish) {
    for (let l1 = 1; l1 < l / 2; l1++) {
      let l2 = l / 2 - l1;
      move_net(sx - l1, sy - l2, l1, l2);
    }
  }
  console.log(answer);
}

function move_net(sx, sy, l1, l2) {
  let d = 0;
  let l1_cnt = l1;
  let l2_cnt = l2;

  while (d !== 4) {
    if (d === 1 || d === 3) {
      sx += dx[d];
      l1_cnt -= 1;
      if (l1_cnt === 0) {
        l1_cnt = l1;
        d += 1;
      }
    } else {
      sy += dy[d];
      l2_cnt -= 1;
      if (l2_cnt === 0) {
        l2_cnt = l2;
        d += 1;
      }
    }

    // 그물의 위치가 유효한지 확인
    if (sx >= 0 && sy >= 0 && sx + l1 <= n && sy + l2 <= n) {
      const ex = sx + l1 + 1;
      const ey = sy + l2 + 1;
      answer = Math.max(answer, count_fish(sx, sy, ex, ey));
    }
  }
}

function count_fish(sx, sy, ex, ey) {
  let cnt = 0;
  if (ex > n || ey > n) {
    return 0;
  }

  for (const [x, y] of fish) {
    if (sx <= x && x < ex && sy <= y && y < ey) {
      cnt += 1;
    }
  }
  return cnt;
}

solution();

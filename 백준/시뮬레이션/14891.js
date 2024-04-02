const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14891.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [gear1, gear2, gear3, gear4, K, ...rotate] = input;

gear1 = gear1.split("").map(Number);
gear2 = gear2.split("").map(Number);
gear3 = gear3.split("").map(Number);
gear4 = gear4.split("").map(Number);
rotate = rotate.map((v) => v.split(" ").map(Number));

let gear = [gear1, gear2, gear3, gear4];

for (let [k, d] of rotate) {
  let dir = Array(4).fill(0);
  dir[k - 1] = d;

  // 돌리는 k번째 톱니바퀴 왼쪽, 오른쪽 체크 하며 돌릴지, 돌린다면 어느 방향으로 돌릴지 체크
  for (let i = k - 1; i > 0; i--) {
    if (gear[i][6] !== gear[i - 1][2]) dir[i - 1] = -dir[i];
    else break; // 만약 같은 극일경우 회전하지 않으므로 다음 톱나바퀴부터 확인할 필요 x
  }

  for (let i = k - 1; i < 3; i++) {
    if (gear[i][2] !== gear[i + 1][6]) dir[i + 1] = -dir[i];
    else break;
  }

  // 4개 톱니바퀴 위에서 정한 방향대로 돌림 (0: 안돌림, 1: 시계방향, -1: 반시계방향)
  for (let i = 0; i < 4; i++) {
    if (dir[i] === 0) continue;

    if (dir[i] === 1) gear[i].unshift(gear[i].pop()); // 시계
    else gear[i].push(gear[i].shift()); // 반시계
  }
}

let answer = 0;

for (let i = 0; i < 4; i++) {
  let position = gear[i][0];

  if (position === 0) continue;

  answer += Math.pow(2, i);
}

console.log(answer);

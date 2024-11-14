const [r1, c1, r2, c2] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/1022.txt"
  )
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const rows = r2 - r1 + 1;
const cols = c2 - c1 + 1;
const grid = Array.from(Array(rows), () => Array(cols).fill(""));

const directions = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];

let x = 0,
  y = 0; // 현재 위치
let num = 1;
let dirIndex = 0;
let stepLimit = 1; // 현재 단계에서의 이동 횟수 제한
let steps = 0; // 현재 방향에서 이동한 횟수
let maxLength = 1;
let directionChanges = 0;

while (num <= 10001 * 10001) {
  // 범위 내에 있는 경우 grid에 숫자 기록
  if (x >= r1 && x <= r2 && y >= c1 && y <= c2) {
    const displayRow = x - r1;
    const displayCol = y - c1;
    grid[displayRow][displayCol] = `${num}`;
    maxLength = Math.max(maxLength, grid[displayRow][displayCol].length);
  }

  // 다음 위치로 이동
  const [dx, dy] = directions[dirIndex];
  x += dx;
  y += dy;
  num++;
  steps++;

  // 현재 방향에서의 단계 제한에 도달하면 방향 전환
  if (steps === stepLimit) {
    steps = 0;
    dirIndex = (dirIndex + 1) % 4;
    directionChanges++;

    // 두 번 방향을 전환할 때마다 단계 제한을 증가시킴
    if (directionChanges === 2) {
      directionChanges = 0;
      stepLimit++;
    }
  }
}

// 결과 출력
const result = grid
  .map((row) => row.map((cell) => cell.padStart(maxLength, " ")).join(" "))
  .join("\n");
console.log(result);

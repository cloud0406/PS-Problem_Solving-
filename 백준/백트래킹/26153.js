const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/26153.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const waterMap = Array.from({ length: N }, (_, i) =>
  input[i + 1].split(" ").map(Number)
);

const [startX, startY, P] = input[N + 1].split(" ").map(Number);

const directions = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

const visited = Array.from({ length: N }, () => Array(M).fill(false));

let maxWater = waterMap[startX][startY];

function installPipe(x, y, remainParts, prevDir, currentWater) {
  if (!(x === startX && y === startY)) {
    maxWater = Math.max(maxWater, currentWater);
  }

  if (remainParts <= 0) return;

  for (let dir = 0; dir < 4; dir++) {
    const nextX = x + directions[dir][0];
    const nextY = y + directions[dir][1];

    if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M) continue;
    if (nextX === startX && nextY === startY) continue;
    if (visited[nextX][nextY]) continue;

    visited[nextX][nextY] = true;

    if (x === startX && y === startY) {
      installPipe(
        nextX,
        nextY,
        remainParts - 1,
        dir,
        currentWater + waterMap[nextX][nextY]
      );
    } else if (prevDir === dir) {
      installPipe(
        nextX,
        nextY,
        remainParts - 1,
        dir,
        currentWater + waterMap[nextX][nextY]
      );
    } else if (remainParts >= 2) {
      installPipe(
        nextX,
        nextY,
        remainParts - 2,
        dir,
        currentWater + waterMap[nextX][nextY]
      );
    }

    visited[nextX][nextY] = false;
  }
}

visited[startX][startY] = true;
installPipe(startX, startY, P, -1, waterMap[startX][startY]);

console.log(maxWater);

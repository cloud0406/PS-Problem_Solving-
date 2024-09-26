const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1261.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number);
const visited = Array.from({ length: N }, () => Array(M).fill(false));
const maze = input.slice(1).map((v) => v.split("").map(Number));
const queue = [];

const move = {
  up: (x, y) => [x, y - 1],
  down: (x, y) => [x, y + 1],
  right: (x, y) => [x + 1, y],
  left: (x, y) => [x - 1, y],
};

queue.push([0, 0, 0]);
visited[0][0] = true;

while (queue.length) {
  const [x, y, crush] = queue.shift();

  if (x === M - 1 && y === N - 1) {
    console.log(crush);
    break;
  }

  for (direction of ["up", "down", "right", "left"]) {
    const [nx, ny] = move[direction](x, y);

    if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
    if (visited[ny][nx]) continue;

    // unshift로 빈 방 먼저 탐색하도록
    if (maze[ny][nx] === 0) {
      queue.unshift([nx, ny, crush]);
      visited[ny][nx] = true;
    } else {
      // 부숴야 하는 벽은 뒤쪽에 추가
      queue.push([nx, ny, crush + 1]);
      visited[ny][nx] = true;
    }
  }
}

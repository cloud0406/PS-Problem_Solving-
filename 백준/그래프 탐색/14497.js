const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14497.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [y1, x1, y2, x2] = input[1].split(" ").map((v) => +v - 1);
const classroom = input.slice(2).map((row) => row.split(""));

function bfs(startX, startY) {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const visited = Array.from({ length: N }, () => Array(M).fill(-1));
  const queue = [[startX, startY]];
  visited[startY][startX] = 0;

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (nx < 0 || nx >= M || ny < 0 || ny >= N || visited[ny][nx] !== -1)
        continue;

      if (classroom[ny][nx] === "1" || classroom[ny][nx] === "#") {
        visited[ny][nx] = visited[curY][curX] + 1;
        queue.push([nx, ny]);
      } else {
        visited[ny][nx] = visited[curY][curX];
        queue.unshift([nx, ny]); // 0인 경우 우선 탐색
      }
    }
  }

  return visited[y2][x2];
}

console.log(bfs(x1, y1));

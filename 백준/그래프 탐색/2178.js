const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2178.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split("").map(Number));

function bfs(x, y) {
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  const visited = Array.from({ length: N }, () => Array(M).fill(0));

  visited[x][y] = 1;
  const queue = [[x, y]];

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const xPos = x + dx[i];
      const yPos = y + dy[i];

      // 미로를 벗어나지 않는 좌표내에서
      if (xPos >= 0 && xPos < N && yPos >= 0 && yPos < M) {
        // 이동 가능하고, 방문하지 않은 좌표를 방문
        if (map[xPos][yPos] === 1 && visited[xPos][yPos] === 0) {
          visited[xPos][yPos] = visited[x][y] + 1; // [xPos][yPos] 경로까지의 최단거리 갱신
          queue.push([xPos, yPos]);
        }
      }
    }
  }

  return visited[N - 1][M - 1];
}

console.log(bfs(0, 0));

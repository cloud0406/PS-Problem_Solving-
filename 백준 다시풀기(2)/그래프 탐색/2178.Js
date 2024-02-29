const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2178.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split("").map(Number));

function solution(N, M, map) {
  const bfs = (x, y) => {
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];
    const visited = Array.from({ length: N }, () => Array(M).fill(0));

    visited[x][y] = 1;
    const queue = [[x, y]];

    while (queue.length) {
      const [x, y] = queue.pop();

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < M &&
          !visited[nx][ny] &&
          map[nx][ny] === 1
        ) {
          visited[nx][ny] = visited[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
    }

    return visited[N - 1][M - 1];
  };

  return bfs(0, 0);
}

console.log(solution(N, M, map));

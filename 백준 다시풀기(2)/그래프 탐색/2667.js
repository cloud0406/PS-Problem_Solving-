const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2667.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = input.shift();
const arr = input.map((item) => item.split("").map(Number));

function solution(N, arr) {
  let answer = [];
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  const bfs = (x, y) => {
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];

    visited[x][y] = true;
    const queue = [[x, y]];
    let cnt = 1;

    while (queue.length) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < N &&
          !visited[nx][ny] &&
          arr[nx][ny] === 1
        ) {
          visited[nx][ny] = true;
          cnt++;
          queue.push([nx, ny]);
        }
      }
    }

    return cnt;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] === 1 && !visited[i][j]) answer.push(bfs(i, j));
    }
  }

  return [answer.length, ...answer.sort((a, b) => a - b)].join("\n");
}

console.log(solution(N, arr));

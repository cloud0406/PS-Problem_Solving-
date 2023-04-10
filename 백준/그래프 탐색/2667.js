const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2667.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = input.shift();
const arr = input.map((item) => item.split("").map(Number));
const visited = Array.from({ length: N }, () => Array(N).fill(false));

function bfs(x, y) {
  const queue = [[x, y]];
  visited[x][y] = true;

  let cnt = 1; // 시작좌표도 포함이므로 1부터 시작

  let dx = [0, 1, 0, -1];
  let dy = [-1, 0, 1, 0];

  while (queue.length) {
    let [posX, posY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nx = posX + dx[i];
      let ny = posY + dy[i];

      // 좌표의 유효성 확인
      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        // 해당 좌표에 집이 있고 방문하지 않았다면
        if (arr[nx][ny] === 1 && !visited[nx][ny]) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
          cnt++;
        }
      }
    }
  }

  return cnt; // 단지의 집 개수
}

function solution() {
  const answer = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 집이 있는 좌표를 탐색 후 해당 지점을 시작으로 단지를 만듬
      if (arr[i][j] === 1 && !visited[i][j]) answer.push(bfs(i, j));
    }
  }

  console.log(answer.length);
  answer.sort((a, b) => a - b).forEach((item) => console.log(item));
}

solution();

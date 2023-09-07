const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "./dev/stdin" : __dirname + "/input/2636.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((v) => v.split(" ").map(Number));

function soloution(N, M, board) {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  let time = 0;
  let cnt = 0;

  const bfs = () => {
    const queue = [];
    queue.push([0, 0]);

    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    visited[0][0] = true;

    let nodes = [];

    // 치즈 벽면의 가장 외곽 부분들만 node 배열에 담음
    while (queue.length) {
      const [x, y] = queue.pop();

      for (let k = 0; k < 4; k++) {
        const nx = x + dx[k];
        const ny = y + dy[k];

        if (nx < 0 || ny < 0 || nx >= N || ny >= M || visited[nx][ny]) continue;

        // 치즈 좌표 탐색
        if (board[nx][ny] === 1) {
          nodes.push([nx, ny]);
          visited[nx][ny] = true;
          continue;
        }

        // 치즈 아니라면 큐에 추가
        queue.push([nx, ny]);
        visited[nx][ny] = true;
      }
    }

    // 외곽의 치즈들은 녹아 없어지므로 0으로 처리
    for (const [x, y] of nodes) {
      board[x][y] = 0;
    }

    // 더 이상 녹은 치즈 없다면 종료
    if (!nodes.length) return true;

    cnt = nodes.length;

    return false;
  };

  while (true) {
    if (bfs()) break;

    // 제거되는 치즈가 존재할 경우에만 시간을 증가시킨다.
    time++;
  }

  return [time, cnt].join("\n");
}

console.log(soloution(N, M, board));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/18045.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const board = input.slice(1, -1).map((i) => i.split(" ").map(Number));
const [s, x, y] = input[input.length - 1].split(" ").map(Number);

const queue = Array.from({ length: k + 1 }, () => []);
const visited = Array.from({ length: n }, () => new Array(n).fill(false));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    let virus = board[i][j];

    if (virus !== 0) {
      visited[i][j] = true;
      queue[virus].push([i, j]); // 보드에 바이러스 값별로 큐를 따로 생성
    }
  }
}

// s초만큼
for (let i = 0; i < s; i++) {
  // 바이러스 종류 만큼
  // 작은 바이러스부터 먼저 퍼트림
  for (let virus = 1; virus <= k; virus++) {
    const tmp = [];

    while (queue[virus].length) {
      const [cx, cy] = queue[virus].shift();

      for (let j = 0; j < 4; j++) {
        const nx = cx + dx[j];
        const ny = cy + dy[j];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

        if (!visited[nx][ny] && board[nx][ny] === 0) {
          visited[nx][ny] = true;
          board[nx][ny] = virus;

          tmp.push([nx, ny]);
        }
      }
    }

    // 큐를 위이 while문에서 채우면 작은 바이러스인 1로만 계속 확산됨
    // 작은 바이러스 1번 확산 -> 해당 바이러스 큐 변경  -> ~ 큰 바이러스 1번 확산 -> 해당 바이러스 큐 변경
    queue[virus] = tmp;
  }
}

console.log(board[x - 1][y - 1]);

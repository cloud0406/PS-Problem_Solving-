const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/14502.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((i) => i.split(" ").map(Number));

function solution(N, M, board) {
  let answer = 0;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  // 바이러스 확산 -> 확산 후 안전지역 카운팅
  const countingSafeZone = (arr) => {
    let cnt = 0;
    let queue = [];

    // 현재 바이러스있는 좌표 큐에 담음
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (arr[i][j] === 2) queue.push([i, j]);
      }
    }

    // 더 확산할 수 없을때까지 계속 확산
    while (queue.length) {
      const [curX, curY] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const [nx, ny] = [curX + dx[i], curY + dy[i]];

        if (nx >= 0 && nx < N && ny >= 0 && ny < M && arr[nx][ny] === 0) {
          arr[nx][ny] = 2;
          queue.push([nx, ny]);
        }
      }
    }

    // 안전 지역 카운팅
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (arr[i][j] === 0) cnt++;
      }
    }

    return cnt;
  };

  const dfs = (cnt) => {
    // 벽 3개되면 바이러스 확산 시키고 카운팅
    if (cnt === 3) {
      let tmpArr = board.map((v) => [...v]); // 2차원 배열 깊은 복사
      answer = Math.max(answer, countingSafeZone(tmpArr));

      return;
    }

    // 벽 설치
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] === 0) {
          board[i][j] = 1;
          dfs(cnt + 1);
          board[i][j] = 0;
        }
      }
    }
  };

  dfs(0);
  return answer;
}

console.log(solution(N, M, board));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/14500.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, M, arr) {
  let answer = 0;
  const visited = [...Array(N)].map(() => Array(M).fill(false));
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  const dfs = (x, y, L, total) => {
    if (L === 4) {
      answer = Math.max(answer, total);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && !visited[nx][ny]) {
        if (L === 2) {
          visited[nx][ny] = true;
          dfs(x, y, L + 1, total + arr[nx][ny]);
          visited[nx][ny] = false;
        }

        visited[nx][ny] = true;
        dfs(nx, ny, L + 1, total + arr[nx][ny]);
        visited[nx][ny] = false;
      }
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, 1, arr[i][j]);
      visited[i][j] = false;
    }
  }

  return answer;
}

console.log(solution(N, M, arr));

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/14391.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const paper = input.slice(1).map((v) => v.split("").map(Number));

function solution(N, M, paper) {
  let answer = 0;
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  const dfs = (row, col) => {
    if (row === 4) {
      let sum = 0;

      for (let r = 0; r < N; r++) {
        let temp = 0;
        for (let c = 0; c < M; c++) {
          if (visited[r][c]) temp = temp * 10 + paper[r][c];
          else {
            sum += temp;
            temp = 0;
          }
        }
        sum += temp;
      }

      for (let c = 0; c < M; c++) {
        let temp = 0;
        for (let r = 0; r < N; r++) {
          if (!visited[r][c]) temp = temp * 10 + paper[r][c];
          else {
            sum += temp;
            temp = 0;
          }
        }
        sum += temp;
      }

      answer = Math.max(answer, sum);
      return;
    }

    if (col === 4) {
      dfs(row + 1, 0);
      return;
    }

    visited[row][col] = true;
    dfs(row, col + 1);
    visited[row][col] = false;
    dfs(row, col + 1);
  };

  dfs(0, 0);
  return answer;
}

console.log(solution(N, M, paper));

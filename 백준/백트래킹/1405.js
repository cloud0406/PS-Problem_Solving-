let [N, ...percent] = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1405.txt"
  )
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution(N, percent) {
  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];

  const visited = Array.from({ length: 30 }, () => new Array(30).fill(false));
  let result = 0;
  function dfs(r, c, idx, total) {
    if (idx === N) {
      result += total;
      return;
    }
    visited[r][c] = true;

    for (let i = 0; i < 4; i++) {
      const nextR = r + dr[i];
      const nextC = c + dc[i];
      if (
        nextR >= 0 &&
        nextR < 30 &&
        nextC >= 0 &&
        nextC < 30 &&
        !visited[nextR][nextC]
      ) {
        visited[nextR][nextC] = true;
        dfs(nextR, nextC, idx + 1, total * percent[i]);
        visited[nextR][nextC] = false;
      }
    }
  }
  visited[14][14] = true;
  dfs(14, 14, 0, 1);
  return result === 1 ? "1.0" : result;
}

const answer = solution(
  N,
  percent.map((r) => r * 0.01)
);

console.log(answer);

let input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/1987.txt"
  )
  .toString()
  .trim()
  .split("\n");

let [R, C] = input[0].split(" ").map(Number);
let boards = input.slice(1);

let visit = new Array(26).fill(false);
let dx = [-1, 0, 1, 0];
let dy = [0, -1, 0, 1];

let answer = 0;

function dfs(x, y, cnt) {
  answer = Math.max(answer, cnt);

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if (nx >= 0 && nx < R && ny >= 0 && ny < C) {
      let next = boards[nx][ny].charCodeAt() - 65;

      // 해당 알파벳 방문한적 없다면
      if (visit[next] === false) {
        visit[next] = true;
        dfs(nx, ny, cnt + 1);
        visit[next] = false;
      }
    }
  }
}

visit[boards[0][0].charCodeAt() - 65] = true;
dfs(0, 0, 1);

console.log(answer);

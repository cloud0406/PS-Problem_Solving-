const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/5913.txt"
  )
  .toString()
  .trim()
  .split("\n");

const K = +input[0];
const apples = input.slice(1).map((v) => v.split(" ").map(Number));

let answer = 0;

const map = Array.from({ length: 5 }, () => Array(5).fill(0));
for (let [x, y] of apples) {
  map[x - 1][y - 1] = 1;
}

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const dfs = (x, y, cnt) => {
  if ((x === 4) & (y === 4)) {
    if (cnt === 25 - K) answer++;
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx > 4 || ny < 0 || ny > 4) continue;
    if (map[nx][ny] === 1) continue;

    map[x][y] = 1;
    dfs(nx, ny, cnt + 1);
    map[x][y] = 0;
  }
};

dfs(0, 0, 1);
console.log(answer);

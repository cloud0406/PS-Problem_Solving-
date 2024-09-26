const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/9205.txt"
  )
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
let idx = 1;

for (let i = 0; i < T; i++) {
  const N = +input[idx++];
  const visited = Array.from({ length: N }).fill(false);

  const home = input[idx].split(" ").map(Number);
  const convenience = [];
  for (let j = 1; j <= N; j++) {
    convenience.push(input[idx + j].split(" ").map(Number));
  }
  idx += N + 1;
  const festival = input[idx++].split(" ").map(Number);

  let flag = false;
  bfs(...home);

  function bfs(X, Y) {
    const queue = [[X, Y]];

    while (queue.length) {
      const [x, y] = queue[0];
      queue.shift();

      if (Math.abs(x - festival[0]) + Math.abs(y - festival[1]) <= 1000) {
        flag = true;
        return;
      }

      for (let k = 0; k < N; k++) {
        if (!visited[k]) {
          if (
            Math.abs(x - convenience[k][0]) + Math.abs(y - convenience[k][1]) <=
            1000
          ) {
            visited[k] = true;
            queue.push([convenience[k][0], convenience[k][1]]);
          }
        }
      }
    }
    return;
  }

  console.log(flag ? "happy" : "sad");
}

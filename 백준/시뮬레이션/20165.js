const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/20165.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M, R] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1).map((line) => line.split(" ").map(Number));
const status = Array.from({ length: N }, () => Array(M).fill("S"));

const dir = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
};

const orders = [];
for (let i = N + 1; i < N + 1 + R * 2; i += 2) {
  const [X, Y, D] = input[i].split(" ");
  const [dx, dy] = input[i + 1].split(" ").map(Number);
  orders.push([
    [Number(X) - 1, Number(Y) - 1, D],
    [dx - 1, dy - 1],
  ]);
}

function solution() {
  let score = 0;

  for (const order of orders) {
    const [[ax, ay, D], [dx, dy]] = order;

    if (status[ax][ay] === "S") score += bfs(ax, ay, D);
    if (status[dx][dy] === "F") status[dx][dy] = "S";
  }

  console.log(score);
  status.forEach((row) => console.log(row.join(" ")));
}

function bfs(sx, sy, D) {
  const queue = [[sx, sy]];

  status[sx][sy] = "F";
  let score = 0;
  while (queue.length > 0) {
    let [X, Y] = queue.pop();
    const cnt = board[X][Y];
    score++;

    for (let i = 0; i < cnt - 1; i++) {
      X += dir[D][0];
      Y += dir[D][1];

      if (!(X >= 0 && Y >= 0 && X < N && Y < M)) break;
      if (status[X][Y] === "S") {
        status[X][Y] = "F";
        queue.unshift([X, Y]);
      }
    }
  }

  return score;
}

solution();

const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/2589.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [H, W] = input.shift().split(" ").map(Number);
const boards = input.map((v) => v.split(""));
const dir = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
let answer = 0;

const bfs = (x, y) => {
  const queue = [[x, y, 0]]; // 현재 좌표, 초기 시간
  const visited = Array.from(Array(H), () => Array(W).fill(false));

  let result = 0; // 해당 X,Y좌표로 Bfs 실행 후 얻은 최장 시간

  visited[x][y] = true; // 현재 좌표 방문 처리

  while (queue.length) {
    const [x, y, hour] = queue.shift();
    result = Math.max(result, hour);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const nx = x + dir[i][0];
        const ny = y + dir[i][1];

        if (
          nx >= 0 &&
          nx < H &&
          ny >= 0 &&
          ny < W &&
          !visited[nx][ny] &&
          boards[nx][ny] == "L"
        ) {
          queue.push([nx, ny, hour + 1]);
          visited[nx][ny] = true;
        }
      }
    }

    answer = Math.max(answer, result);
  }
};

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (boards[i][j] == "L") bfs(i, j);
  }
}

console.log(answer);

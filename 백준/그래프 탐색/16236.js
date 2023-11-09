const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/16236.txt"
  )
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const water = input.map((v) => v.split(" ").map(Number));
const fishCount = [];
let babySharkPos;
water.forEach((row, x) =>
  row.forEach((size, y) => {
    if (size > 0 && size < 9) {
      fishCount[size] = (fishCount[size] ?? 0) + 1;
    } else if (size === 9) {
      babySharkPos = [x, y];
      water[x][y] = 0;
    }
  })
);

const offset = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];
let babySharkSize = 2;
let eaten = 0;
const bfs = (size) => {
  const visited = [...Array(N)].map(() => Array(N).fill(false));
  const [defaultX, defaultY] = babySharkPos;
  visited[defaultX][defaultY] = true;
  let queue = [[defaultX, defaultY, 0]];
  let depth = 0;
  let nextPos;
  while (queue.length) {
    stack = queue;
    queue = [];
    while (stack.length) {
      const [x, y, elapsed] = stack.pop();

      if (water[x][y] && water[x][y] <= size) {
        if (!depth) {
          depth = elapsed;
          nextPos = [x, y];
        } else {
          const [nx, ny] = nextPos;
          if (nx === x) {
            nextPos = ny < y ? nextPos : [x, y];
          } else {
            nextPos = nx < x ? nextPos : [x, y];
          }
        }
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + offset[i][0];
        const ny = y + offset[i][1];
        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < N &&
          !visited[nx][ny] &&
          water[nx][ny] <= babySharkSize
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny, elapsed + 1]);
        }
      }
    }
    if (depth) {
      break;
    }
  }

  if (nextPos) {
    const [nx, ny] = nextPos;
    fishCount[water[nx][ny]]--;
    water[nx][ny] = 0;
    babySharkPos = [nx, ny];
    eaten++;
    if (eaten === babySharkSize) {
      eaten = 0;
      babySharkSize++;
      edibleMaxSize++;
    }
  }

  return depth;
};

let time = 0;
let edibleMaxSize = 1;
while (fishCount.some((v, i) => i <= edibleMaxSize && v > 0)) {
  const elapsed = bfs(edibleMaxSize);
  if (elapsed) {
    time += elapsed;
  } else {
    break;
  }
}

console.log(time);

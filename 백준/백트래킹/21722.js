const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "dev/stdin" : __dirname + "/input/21722.txt"
  )
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [R, C, T] = input[line++].split(" ").map(Number);
let maxFoodCount = 0;
const visited = Array.from(Array(R), () => Array(C).fill(false));

const DIRECTIONS = {
  dx: [-1, 1, 0, 0],
  dy: [0, 0, -1, 1],
};

// 맵, 시작점
const gameMap = [];
let startPos = [];

// 맵 정보 입력 및 시작 위치 찾기
for (let x = 0; x < R; x++) {
  const row = input[line++].split("");
  for (let y = 0; y < C; y++) {
    if (row[y] === "#") visited[x][y] = true;
    else if (row[y] === "G") startPos = [x, y];
  }

  gameMap.push(row);
}

// pos: 현재 위치, time: 현재까지 걸린 시간, foodCount: 현재까지 먹은 먹이 수
function dfs(pos, time, foodCount) {
  if (time === T) {
    maxFoodCount = Math.max(maxFoodCount, foodCount);
    return;
  }

  maxFoodCount = Math.max(maxFoodCount, foodCount);

  for (let i = 0; i < 4; i++) {
    const nx = pos[0] + DIRECTIONS.dx[i];
    const ny = pos[1] + DIRECTIONS.dy[i];

    if (nx >= 0 && nx < R && ny >= 0 && ny < C) {
      if (!visited[nx][ny]) {
        visited[nx][ny] = true;
        if (gameMap[nx][ny] === "S") {
          dfs([nx, ny], time + 1, foodCount + 1);
        } else {
          dfs([nx, ny], time + 1, foodCount);
        }
        visited[nx][ny] = false;
      } else if (gameMap[nx][ny] !== "#") {
        dfs([nx, ny], time + 1, foodCount);
      }
    }
  }
}

dfs(startPos, 0, 0);
console.log(maxFoodCount);

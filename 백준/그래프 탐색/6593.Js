const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/6593.txt"
  )
  .toString()
  .split("\n");

// 6방향 이동 (상하좌우앞뒤)
const DIRECTIONS = {
  dz: [1, -1, 0, 0, 0, 0],
  dy: [0, 0, 1, -1, 0, 0],
  dx: [0, 0, 0, 0, 1, -1],
};

// 3차원 미로 탐색 BFS
function findEscape(startPoint, building, L, R, C) {
  const queue = [startPoint];
  let queueIndex = 0;
  building[queue[0][0]][queue[0][1]][queue[0][2]] = "#"; // 방문 처리

  while (queueIndex < queue.length) {
    const [level, row, col, minutes] = queue[queueIndex++];

    for (let dir = 0; dir < 6; dir++) {
      const nextLevel = level + DIRECTIONS.dz[dir];
      const nextRow = row + DIRECTIONS.dy[dir];
      const nextCol = col + DIRECTIONS.dx[dir];

      if (isOutOfBounds(nextLevel, nextRow, nextCol, L, R, C)) continue;

      const nextCell = building[nextLevel][nextRow][nextCol];
      if (nextCell === "E") {
        return `Escaped in ${minutes + 1} minute(s).`;
      }

      if (nextCell !== "#") {
        building[nextLevel][nextRow][nextCol] = "#";
        queue.push([nextLevel, nextRow, nextCol, minutes + 1]);
      }
    }
  }

  return "Trapped!";
}

// 시작 지점 'S' 찾기
function findStartPoint(building, L, R, C) {
  for (let level = 0; level < L; level++) {
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (building[level][row][col] === "S") {
          return [level, row, col, 0];
        }
      }
    }
  }
}

function isOutOfBounds(level, row, col, L, R, C) {
  return level < 0 || row < 0 || col < 0 || level >= L || row >= R || col >= C;
}

const results = [];
let inputIndex = 0;

while (true) {
  const [L, R, C] = input[inputIndex++].trim().split(" ").map(Number);
  if (L === 0) break;

  // 3차원 빌딩 구조 생성
  const building = [];
  for (let i = 0; i < L; i++) {
    const floor = [];
    for (let j = 0; j < R; j++) {
      floor.push(input[inputIndex++].trim().split(""));
    }
    building.push(floor);
    inputIndex++; // 빈 줄 건너뛰기
  }

  results.push(
    findEscape(findStartPoint(building, L, R, C), building, L, R, C)
  );
}

console.log(results.join("\n"));

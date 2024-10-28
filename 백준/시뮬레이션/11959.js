const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/11959.txt"
  )
  .toString()
  .trim()
  .split("\n");

const puyo = input.map((v) => v.split(""));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let visited, crushes;
let bomb = 0;

while (true) {
  visited = Array.from({ length: 12 }, () => Array(6).fill(false));
  crushes = [];

  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 6; col++) {
      // 인접한 같은 색깔 블럭 좌표 담아두고 4개 이상인지 확인
      if (puyo[row][col] !== "." && !visited[row][col]) {
        const blocks = dfs(row, col, puyo[row][col]);
        if (blocks.length >= 4) crushes.push(...blocks);
      }
    }
  }

  if (crushes.length === 0) break; // 더 이상 파괴 못 할 때 종료

  // 인접한 블록들 파괴
  crushes.forEach(([x, y]) => {
    puyo[x][y] = ".";
  });

  fallingPuyo();
  bomb++; // 연쇄 횟수 증가
}

console.log(bomb);

function dfs(x, y, color) {
  visited[x][y] = true;
  const stack = [[x, y]];

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    // 상하좌우 같은 색깔 좌표 스택에 추가
    if (
      nx >= 0 &&
      nx < 12 &&
      ny >= 0 &&
      ny < 6 &&
      puyo[nx][ny] === color &&
      !visited[nx][ny]
    ) {
      stack.push(...dfs(nx, ny, color));
    }
  }

  return stack;
}

function fallingPuyo() {
  for (let col = 0; col < 6; col++) {
    const stack = [];

    // 각 열의 푸요 스택에 넣어둠
    for (let row = 11; row >= 0; row--) {
      if (puyo[row][col] !== ".") stack.push(puyo[row][col]);
    }

    // 맨 아래 줄부터 스택에 있는 수 만큼 푸요 차례대로 쌓고 나머진 .으로 대체
    for (let row = 11; row >= 0; row--) {
      puyo[row][col] = stack.length > 0 ? stack.shift() : ".";
    }
  }
}

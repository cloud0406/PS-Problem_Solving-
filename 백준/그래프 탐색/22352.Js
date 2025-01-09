const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/22352.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const initial = input.slice(1, N + 1).map((str) => str.split(" ").map(Number));
const result = input.slice(N + 1).map((str) => str.split(" ").map(Number));
let isPossible = "YES";

// 항체 시작 위치 찾기
let [startRow, startCol] = [-1, -1];
let newValue = -1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (initial[i][j] !== result[i][j]) {
      [startRow, startCol] = [i, j];
      newValue = result[i][j];
      break;
    }
  }
  if (startRow !== -1) break;
}

// 변화가 없는 경우
if (newValue === -1) {
  console.log(isPossible);
  process.exit(0);
}

const visited = Array.from({ length: N }, () => Array(M).fill(false));
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// 항체 전파
function spreadAntibody(row, col) {
  if (visited[row][col]) return;

  visited[row][col] = true;
  const originalValue = initial[row][col];

  for (const [dx, dy] of dirs) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 &&
      newRow < N &&
      newCol >= 0 &&
      newCol < M &&
      !visited[newRow][newCol] &&
      initial[newRow][newCol] === originalValue
    ) {
      spreadAntibody(newRow, newCol);
    }
  }
}

spreadAntibody(startRow, startCol);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (
      (visited[i][j] && result[i][j] !== newValue) ||
      (!visited[i][j] && initial[i][j] !== result[i][j])
    ) {
      isPossible = "NO";
      break;
    }
  }
  if (isPossible === "NO") break;
}

console.log(isPossible);

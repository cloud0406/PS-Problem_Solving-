const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/8972.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const board = input.slice(1, R + 1).map((row) => row.split(""));
const moves = input[R + 1].split("").map(Number);

const dy = [0, 1, 1, 1, 0, 0, 0, -1, -1, -1];
const dx = [0, -1, 0, 1, -1, 0, 1, -1, 0, 1];

// 종수와 미친 아두이노의 초기 위치 찾기
let jongsuPos = board
  .flatMap((row, y) => row.map((cell, x) => (cell === "I" ? [y, x] : null)))
  .filter(Boolean)[0];
let crazyArduinos = board
  .flatMap((row, y) => row.map((cell, x) => (cell === "R" ? [y, x] : null)))
  .filter(Boolean);

// 미친 아두이노 확인 함수
const isCrazyArduino = (y, x) => board[y][x] === "R";

// 종수 이동
function moveJongsu(direction) {
  const [y, x] = jongsuPos;
  const ny = y + dy[direction];
  const nx = x + dx[direction];

  if (isCrazyArduino(ny, nx)) return false; // 미친 아두이노와 충돌 시 false 반환

  // 종수 위치 갱신
  board[y][x] = ".";
  board[ny][nx] = "I";
  jongsuPos = [ny, nx];

  return true;
}

// 미친 아두이노 이동
function moveCrazyArduinos() {
  const [jy, jx] = jongsuPos;
  const newPositions = [];
  const positionCounts = {};

  for (const [y, x] of crazyArduinos) {
    board[y][x] = "."; // 기존 위치 초기화
    let closestDist = Infinity;
    let nextPos = [y, x];

    // 9가지 방향 중 종수와 가장 가까운 방향으로 이동
    for (let d = 1; d <= 9; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (ny < 0 || nx < 0 || ny >= R || nx >= C) continue;

      const distance = Math.abs(ny - jy) + Math.abs(nx - jx);
      if (distance < closestDist) {
        closestDist = distance;
        nextPos = [ny, nx];
      }
    }

    // 종수랑 충돌시 종료
    if (nextPos[0] === jongsuPos[0] && nextPos[1] === jongsuPos[1])
      return false;

    const posKey = `${nextPos[0]}_${nextPos[1]}`;
    positionCounts[posKey] = (positionCounts[posKey] || 0) + 1;
    newPositions.push(nextPos);
  }

  // 폭발 처리: 여러 미친 아두이노가 같은 위치에 있을 경우 제거
  crazyArduinos = newPositions.filter(
    ([y, x]) => positionCounts[`${y}_${x}`] === 1
  );

  for (const [y, x] of crazyArduinos) {
    board[y][x] = "R";
  }

  return true;
}

// 시뮬레이션 실행
function playGame() {
  for (let i = 0; i < moves.length; i++) {
    const direction = moves[i];

    if (!moveJongsu(direction)) {
      console.log(`kraj ${i + 1}`);
      return;
    }

    if (!moveCrazyArduinos()) {
      console.log(`kraj ${i + 1}`);
      return;
    }
  }

  // 모든 이동이 끝난 후 보드 상태 출력
  console.log(board.map((row) => row.join("")).join("\n"));
}

playGame();

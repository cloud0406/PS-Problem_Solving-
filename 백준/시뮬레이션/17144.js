const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/17144.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [R, C, T] = input[0].split(" ").map(Number);
board = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(R, C, T, board) {
  let answer = 0;
  let airCleanerRow = [];

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (board[row][col] === -1) {
        airCleanerRow = [row, row + 1];

        if (airCleanerRow.length > 0) break;
      }
    }
    if (airCleanerRow.length > 0) break;
  }

  // 확산
  const spread = () => {
    let spreadList = [];
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (board[row][col] > 0) {
          const dust = Math.floor(board[row][col] / 5);

          for (let i = 0; i < 4; i++) {
            const [nx, ny] = [row + dx[i], col + dy[i]];
            if (
              nx >= 0 &&
              nx < R &&
              ny >= 0 &&
              ny < C &&
              board[nx][ny] !== -1
            ) {
              spreadList.push([nx, ny, dust]);
              board[row][col] -= dust; // 확산한만큼 현재 기준점은 먼지양 감소
            }
          }
        }
      }
    }

    // 확산가능했던 곳 먼지양 증가 -> 위의 반복문 내부에서 확산시켜버리면 기존 값이 아닌 변경된 값으로 다시 확산을 진행하므로 따로따로 진행해야함
    for (let spread of spreadList) {
      const [row, col, value] = spread;
      board[row][col] += value;
    }
  };

  // 공기청정기 (위) : 위쪽 청정기로부터 바람 역순 방향으로 탐색하며 현재 값을 뒤에 있는 값으로 갱신
  const clearUp = (cleanerRow) => {
    for (let row = cleanerRow - 2; row >= 0; row--) {
      board[row + 1][0] = board[row][0];
    }

    for (let col = 1; col < C; col++) {
      board[0][col - 1] = board[0][col];
    }

    for (let row = 1; row <= cleanerRow; row++) {
      board[row - 1][C - 1] = board[row][C - 1];
    }

    for (let col = C - 2; col > 0; col--) {
      board[cleanerRow][col + 1] = board[cleanerRow][col];
    }

    board[cleanerRow][1] = 0; // 위쪽 청정기 바로 오른쪽은 갱신안되므로 직접 0으로 초기화
  };

  // 공기청정기 (아래) : 아래쪽 청정기로부터 바람 역순 방향으로 탐색하며 현재 값을 뒤에 있는 값으로 갱신
  const clearBottom = (cleanerRow) => {
    for (let row = cleanerRow + 2; row < R; row++) {
      board[row - 1][0] = board[row][0];
    }

    for (let col = 1; col < C; col++) {
      board[R - 1][col - 1] = board[R - 1][col];
    }

    for (let row = R - 2; row >= cleanerRow; row--) {
      board[row + 1][C - 1] = board[row][C - 1];
    }

    for (let col = C - 2; col > 0; col--) {
      board[cleanerRow][col + 1] = board[cleanerRow][col];
    }

    board[cleanerRow][1] = 0; // 아래쪽 청정기 바로 오른쪽은 갱신안되므로 직접 0으로 초기화
  };

  // T 만큼 진행 (확산 -> 위쪽 순환 -> 아래쪽 순환)
  while (T--) {
    spread();
    clearUp(airCleanerRow[0]);
    clearBottom(airCleanerRow[1]);
  }

  // 남아있는 미세먼지 양 계산
  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (board[row][col] > 0) answer += board[row][col];
    }
  }

  return answer;
}

console.log(solution(R, C, T, board));

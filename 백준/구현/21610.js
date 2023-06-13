const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/21610.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let board = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
let moves = input.slice(N + 1).map((v) => v.split(" ").map(Number));

function solution(N, M, board, moves) {
  // 구름 위치
  let clouds = [
    [N - 2, 0],
    [N - 2, 1],
    [N - 1, 0],
    [N - 1, 1],
  ];

  // 방향
  const directions = {
    1: [0, -1],
    2: [-1, -1],
    3: [-1, 0],
    4: [-1, 1],
    5: [0, 1],
    6: [1, 1],
    7: [1, 0],
    8: [1, -1],
  };

  // 대각선 방향
  const diagX = [-1, -1, 1, 1];
  const diagY = [-1, 1, -1, 1];

  let answer = 0;

  for (let [moveDirection, moveCount] of moves) {
    // 1번 : 모든 구름 이동
    const nextClouds = [];
    for (let cloud of clouds) {
      const [row, col] = cloud; // 현재 구름 위치
      const [rowDirection, colDirection] = directions[moveDirection];

      // 새 위치 갱신
      let nRow = (row + rowDirection * moveCount) % N;
      let nCol = (col + colDirection * moveCount) % N;
      nRow = nRow < 0 ? nRow + N : nRow;
      nCol = nCol < 0 ? nCol + N : nCol;

      nextClouds.push([nRow, nCol]);
    }

    // 2번 : 현재 구름 물의양 +1
    let visited = Array.from({ length: N }, () => Array(N).fill(false));
    for (let cloud of nextClouds) {
      const [row, col] = cloud;
      board[row][col]++;
      visited[row][col] = true; // 5번에서 현재 구름 제외 나머지칸에 구름이 생기기 때문에 현재 구름 위치 저장
    }

    // 3번 : 구름 모두 비우기
    clouds = [];

    // 4번 : 구름이 이동한 위치에서 물복사 버그 -> 대각선 방향으로 거리 1인 칸에 물이 있는 바구니의 수만큼 현재 바구니의 물의 양 증가
    for (let cloud of nextClouds) {
      const [row, col] = cloud;
      let count = 0;

      for (let i = 0; i < 4; i++) {
        const [nRow, nCol] = [row + diagX[i], col + diagY[i]];

        // 보드 범위 밖이거나, 해당 위치에 물이 없다면 건너 뜀
        if (
          nRow < 0 ||
          nRow >= N ||
          nCol < 0 ||
          nCol >= N ||
          board[nRow][nCol] === 0
        )
          continue;

        count++; // 4방향 대각선 탐색하며 물 있는 곳 카운팅
      }

      board[row][col] += count; // 카운팅한 수만큼 증가
    }

    // 5번 : 기존 구름이였던 곳 제외하고 물의 양이 2이상인 모든 칸에 구름 생김, 물의 양은 -2
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (!visited[row][col] && board[row][col] >= 2) {
          clouds.push([row, col]);
          board[row][col] -= 2;
        }
      }
    }
  }

  // 최종 계산 : 바구니의 물 총 합 구하기
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      answer += board[row][col];
    }
  }

  return answer;
}

console.log(solution(N, M, board, moves));

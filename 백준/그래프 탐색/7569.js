const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/7569.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [M, N, H] = input.shift().split(" ").map(Number);
const boards = [];
for (let i = 0; i < H; i++) {
  const board = input
    .slice(N * i, N + N * i)
    .map((v) => v.split(" ").map(Number));
  boards.push(board);
}

function solution(col, row, H, boards) {
  const q = [];
  const dist = Array.from({ length: H }, () =>
    // 해당 좌표 토마토 몇일에 익는지 저장
    Array.from({ length: row }, () => Array(col).fill(0))
  );

  for (let k = 0; k < H; k++) {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (boards[k][i][j] === 1) q.push([k, i, j]); // 익은 토마토 좌표
        if (boards[k][i][j] === 0) dist[k][i][j] = -1; // 익지 않은 토마토 -1로 표시
      }
    }
  }

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  const dh = [-1, 1];
  let head = 0;

  // 익은 토마토만 큐에 있음
  // head가 큐의 길이와 같아지면 -> 큐의 모든 요소들을 다 탐색하면 종료
  while (q.length > head) {
    const [h, x, y] = q[head++];

    // 4방향 탐색
    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];

      // 좌표 벗어나거나, 익은 토마토라면 건너 뛰기
      if (nx < 0 || ny < 0 || nx >= row || ny >= col) continue;
      if (dist[h][nx][ny] >= 0) continue;

      dist[h][nx][ny] = dist[h][x][y] + 1; // 해당 좌표에 토마토 익은 날짜 저장
      q.push([h, nx, ny]); // 주변 익은 토마토 큐에 넣기
    }

    // 위 아래 층 탐색
    for (let k = 0; k < 2; k++) {
      const nh = h + dh[k];

      // 좌표 벗어나거나, 익은 토마토라면 건너 뛰기
      if (nh < 0 || nh >= H) continue;
      if (dist[nh][x][y] >= 0) continue;

      dist[nh][x][y] = dist[h][x][y] + 1; // 해당 좌표에 토마토 익은 날짜 저장
      q.push([nh, x, y]); // 주변 익은 토마토 큐에 넣기
    }
  }

  // 토마토가 익을 때까지의 최소 날짜 출력
  let day = 0;
  for (let k = 0; k < H; k++) {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (dist[k][i][j] === -1) return -1; // 익지 않은 토마토 찾기
        day = Math.max(day, dist[k][i][j]); // 날짜 갱신
      }
    }
  }

  return day;
}

console.log(solution(M, N, H, boards));

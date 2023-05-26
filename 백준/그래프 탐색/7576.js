const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/7576.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [M, N] = input.shift().split(" ").map(Number);
const board = input.map((v) => v.split(" ").map(Number));

function solution(col, row, board) {
  const q = [];
  // 좌표에 해당하는 토마토가 익는 날짜를 담아둘 배열
  const dist = Array.from({ length: row }, () => Array(col).fill(0));

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === 1) q.push([i, j]); // 익은 토마토 좌표
      if (board[i][j] === 0) dist[i][j] = -1; // 익지 않은 토마토 -1로 표시
    }
  }

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  let head = 0;

  // 익은 토마토만 큐에 있음
  // head가 큐의 길이와 같아지면 -> 큐의 모든 요소들을 다 탐색하면 종료
  while (q.length > head) {
    const [x, y] = q[head++];
    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];

      // 좌표 벗어나거나, 익은 토마토라면 건너 뛰기
      if (nx < 0 || ny < 0 || nx >= row || ny >= col) continue;
      if (dist[nx][ny] >= 0) continue;

      dist[nx][ny] = dist[x][y] + 1; // 해당 좌표에 토마토 익은 날짜 저장
      q.push([nx, ny]); // 주변 익은 토마토 큐에 넣기
    }
  }

  // 토마토가 익을 때까지의 최소 날짜 출력
  let day = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (dist[i][j] === -1) return -1; // 익지 않은 토마토 찾기
      day = Math.max(day, dist[i][j]); // 날짜 갱신
    }
  }

  return day;
}

console.log(solution(M, N, board));

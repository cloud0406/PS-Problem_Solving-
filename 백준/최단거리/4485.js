const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/4485.txt"
  )
  .toString()
  .trim()
  .split("\n");

let idx = 0;
let testcase = 1;

while (1) {
  const n = +input[idx++];
  if (n === 0) break;

  const dx = [0, 1, -1, 0];
  const dy = [1, 0, 0, -1];

  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(input[idx++].split(" ").map(Number));
  }

  // 최소 가중치를 저장할 dist 테이블
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
  dist[0][0] = board[0][0];

  const heap = [[board[0][0], 0, 0]]; // [distance, y, x]

  while (heap.length > 0) {
    // heap을 거리순 정렬 -> 가장 작은 값을 pop
    heap.sort((a, b) => a[0] - b[0]);
    const [distance, y, x] = heap.shift();

    // 도착지 도착
    if (y === n - 1 && x === n - 1) {
      console.log(`Problem ${testcase++}: ${distance}`);
      break;
    }

    // 탐색
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny >= 0 && ny < n && nx >= 0 && nx < n) {
        const cost = distance + board[ny][nx];

        // 최소 비용 업데이트
        if (dist[ny][nx] > cost) {
          dist[ny][nx] = cost;
          heap.push([cost, ny, nx]);
        }
      }
    }
  }
}

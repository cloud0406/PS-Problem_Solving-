const input = require("fs")
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : __dirname + "/input/14940.txt"
  )
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((v) => v.split(" ").map(Number));

function soloution() {
  const answer = Array.from({ length: N }, () => Array(M).fill(Infinity));

  // 목적지 좌표 변수
  let X = 0;
  let Y = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 2) {
        X = i;
        Y = j;
        answer[i][j] = 0;
      }
    }
  }

  const queue = [[X, Y]]; // 목적지 좌표부터 시작
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  while (queue.length) {
    let [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        answer[nx][ny] === Infinity && // 아직 방문 안한좌표
        arr[nx][ny] === 1 // 갈 수 있는 땅
      ) {
        answer[nx][ny] = answer[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // bfs 돌린 후 방문하지 못한 좌표 체크
      if (answer[i][j] === Infinity) {
        if (arr[i][j] === 0) answer[i][j] = 0; // 원래 갈 수 없는 땅
        else answer[i][j] = -1; // 갈 수 있지만 도달 못한 땅
      }
    }
  }

  return answer.map((v) => v.join(" ")).join("\n");
}

console.log(soloution());
